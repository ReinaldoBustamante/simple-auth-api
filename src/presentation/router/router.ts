import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./users/routes";


export class ServerRouter {

    constructor() { }

    public static router(): Router {
        const router = Router()

        router.use('/auth', AuthRoutes.router())
        router.use('/users', UserRoutes.router())
        
        return router
    }

}