import { Request, Response } from "express"
import { RegisterUserDto } from "../../../domain/dtos/registerUserDto"
import { AuthService } from "../../../domain/services/authService"
import { LoginUserDto } from "../../../domain/dtos/loginUserDto"
import { JWTAdapter } from "../../../config/adapters/jwt.adapter"

export class AuthController {
    constructor(
        public readonly authService: AuthService
    ) { }

    public login = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({ error })
        this.authService.login(loginUserDto!)
            .then(user => res.json(user))
            .catch(err => res.status(err.statusCode).json({ err: err.message }))
    }

    public register = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({ error })
        this.authService.register(registerUserDto!)
            .then(user => res.json(user))
            .catch(err => res.status(err.statusCode).json({ err: err.message }))

    }


    public validate = (req: Request, res: Response) => {
        const token = req.params.token
        if(!token) return res.status(400).json({error: 'no token provider'})
        
        try{
            const decode = JWTAdapter.verify(token)
            res.json(decode)
           
        } catch (error) {
            return res.status(500).json('internal server error')
        }


        

    }
}