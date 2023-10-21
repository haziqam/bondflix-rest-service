import { Request, Response } from 'express';
import {UserService} from "../services/user.service";
import {ResponseUtil} from "../../utils/response.utils";
import {LoginSchema} from "../../schema/auth/login.schema";
import {User} from "@prisma/client";
import {ServiceContainer} from "../../containers/service.container";
import {RepositoryContainer} from "../../containers/repository.container";
import {UserRepositoryPrisma} from "../../adapters/prisma/database/user.repository.prisma";

/**
 * What to do in Controllers:
 * 1. Handle HTTP Request
 * 2. Validation of Input (Use Zod or What)
 * 3. Don't Implement Business Logic
 * 4. Don't Access DB directly
 */

export class UserController {
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getUser(req: Request, res: Response) {
        try {
            const dataUser = {
                username: "user",
                email: "test"
            }
            return ResponseUtil.sendResponse(res, 200, "Success fetch data", dataUser);
        } catch (error) {
            return ResponseUtil.sendError(res, 500, "Internal server error", null);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { identifier, password } = LoginSchema.parse(req.body);
            const user: User | null = await this.userService.authenticate(identifier, password);
            if (user) {
                return ResponseUtil.sendResponse(res, 200, "Login successful", {
                    username: identifier,
                    token: password
                })
            } else {
                return  ResponseUtil.sendError(res, 404, "Authentication failed", null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, "Internal server error", error);
        }
    }
}
