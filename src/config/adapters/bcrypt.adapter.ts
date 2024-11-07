import { genSaltSync, compareSync, hashSync} from 'bcrypt'

export class BcryptAdapter {

    public static hash(password: string){
        const salt = genSaltSync();
        return hashSync(password, salt)
    }

    public static compare(password: string, hash: string){
        return compareSync(password, hash)
    }
}