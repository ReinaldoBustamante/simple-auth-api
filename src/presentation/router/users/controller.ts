import { Request, Response } from "express";
import { prisma } from "../../../config/db/connection";

export class UserController {
    constructor() { }

    public getUsers = async (req: Request, res: Response) => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                created_at: true,
                updated_at: true
            }
        })
        res.json(users)
    }
}