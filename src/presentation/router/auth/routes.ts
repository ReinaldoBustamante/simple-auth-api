import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../../../domain/services/authService";

export class AuthRoutes {

    constructor() { }

    public static router(): Router {
        const router = Router()
        const authService = new AuthService()
        const authController = new AuthController(authService)

        router.post('/login', authController.login)
        router.post('/register', authController.register)
        router.get('/validate/:token', authController.validate)

        return router
    }

}