import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config/adapters/jwt.adapter";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export class AuthMiddleware {

    public static validateJWT(req: Request, res: Response, next: NextFunction) {

        const authorization = req.headers.authorization
        if (!authorization) return res.status(401).json({ error: 'No bearer token' })
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') return res.status(400).json({ error: 'only accept bearer token' })

        try {
            const payload = JWTAdapter.verify(token)
            req.body.user = payload
            next()
        } catch (error) {

            if(error instanceof TokenExpiredError) return res.status(401).json({ error: 'Token has expired' });
            if(error instanceof JsonWebTokenError) return res.status(401).json({ error: 'Invalid token' });
            console.log(error)

            return res.status(500).json({ error: 'internal server error' })
        }



       
    }
}