import { Request, Response } from 'express';
import {UserService} from "../services/user.service";
import {ResponseUtil} from "../../utils/response.utils";

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
            return ResponseUtil.sendResponse(res, 200, "Success fetch data", null);
        } catch (error) {
            return ResponseUtil.sendError(res, 500, "Internal server error", null);
        }
    }
}
