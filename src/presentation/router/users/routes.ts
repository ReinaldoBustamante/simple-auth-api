import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class UserRoutes {


    public static router(): Router {
        const userController = new UserController();


        const router = Router();
        router.get('/', [AuthMiddleware.validateJWT], userController.getUsers)

        return router
    }
}