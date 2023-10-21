import {Request, Response} from 'express';
import {UserService} from "../services/user.service";
import {ResponseUtil} from "../../utils/response.utils";
import {LoginSchema} from "../../schema/auth/login.schema";
import {RegisterSchema} from "../../schema/auth/register.schema";

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
            const token: string | null = await this.userService.authenticate(identifier, password);
            if (token) {
                return ResponseUtil.sendResponse(res, 200, "Login successful", {
                    token: token
                });
            } else {
                return ResponseUtil.sendError(res, 404, "Authentication failed", null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, "Internal server error", error);
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const {username, name, email, password} = RegisterSchema.parse(req.body);
            const success = await this.userService.register(username, name, email, password);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, "Registration successful", null);
            } else {
                return ResponseUtil.sendError(res, 500, "Registration failed", null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, "Internal server error", error);
        }
    }
}
