import { BcryptAdapter } from "../../config/adapters/bcrypt.adapter";
import { JWTAdapter } from "../../config/adapters/jwt.adapter";
import { prisma } from "../../config/db/connection";
import { LoginUserDto } from "../dtos/loginUserDto";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { CustomError } from "../errors/CustomError";


export class AuthService {

    public async register(registerUserDto: RegisterUserDto) {
        const { email, password } = registerUserDto
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (user) throw CustomError.conflict(`User with id: ${user.id} already exists`)

            const userCreated = await prisma.user.create({
                data: {
                    ...registerUserDto,
                    password: BcryptAdapter.hash(password) //hash password
                }
            })
            const { password: unusedPassword, ...userEntity } = userCreated
            return userEntity

        } catch (error) {
            if (error instanceof CustomError) throw error
            throw CustomError.internal('Internal server error')
        }
    }

    public async login(LoginUserDto: LoginUserDto) {
        const { email, password } = LoginUserDto
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
                
            })
            if (!user) throw CustomError.notFound(`User with email: ${email} not found`)

            const { password: hashedPassword, ...userEntity } = user

            //compare password
            if(!BcryptAdapter.compare(password, hashedPassword)) throw CustomError.unAuthorized('invalid password')
            
            //generar jwt
            const token = JWTAdapter.sign({
                userId: userEntity.id,
                role: userEntity.role
            })
            
            return {
                ...userEntity,
                token
            }
            

        } catch (error) {
            if (error instanceof CustomError) throw error
            throw CustomError.internal('Internal server error')
        }
    }
}