import { sign, verify } from 'jsonwebtoken'

export class JWTAdapter {

    public static sign(payload: any) {
        return sign(payload, 'seed', { expiresIn: 60 * 15 })
    }

    public static verify(token: string){
        return verify(token, 'seed')
    }
}