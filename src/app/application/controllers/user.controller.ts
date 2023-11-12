import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ResponseUtil } from "../../utils/response.utils";
import { LoginSchema } from "../../schema/auth/login.schema";
import { RegisterSchema } from "../../schema/auth/register.schema";
import { CreateUserSchema } from "../../schema/user/create_user.schema";
import { UpdateUserSchema } from "../../schema/user/update_user.schema";
import { handle_error } from "../../utils/handle_error.utils";
import { verifyJWT } from "../../utils/jwt.utils";

const JWT_COOKIE_MAX_AGE = 1800000;

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

    async getUsers(req: Request, res: Response) {
        try {
            const username = req.query.username as string;
            if (username) {
                const user = await this.userService.findUserByUsername(
                    username
                );
                if (user) {
                    return ResponseUtil.sendResponse(
                        res,
                        200,
                        "User retrieved successfully",
                        user
                    );
                } else {
                    return ResponseUtil.sendError(
                        res,
                        404,
                        "User not found",
                        null
                    );
                }
            } else {
                const allUsers = await this.userService.getAllUsers();

                if (allUsers && allUsers.length > 0) {
                    return ResponseUtil.sendResponse(
                        res,
                        200,
                        "Success",
                        allUsers
                    );
                } else {
                    return ResponseUtil.sendResponse(
                        res,
                        404,
                        "No user found",
                        null
                    );
                }
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { username, name, email, password, isAdmin } =
                CreateUserSchema.parse(req.body);
            const success = await this.userService.createUser(
                username,
                name,
                email,
                password,
                isAdmin
            );
            if (success) {
                return ResponseUtil.sendResponse(
                    res,
                    200,
                    "User created successfully",
                    null
                );
            } else {
                return ResponseUtil.sendError(res, 404, "User not found", null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            const { ...updatedUser } = UpdateUserSchema.parse(req.body);
            const success = await this.userService.updateUser(
                userId,
                updatedUser
            );
            if (success) {
                return ResponseUtil.sendResponse(
                    res,
                    200,
                    "User updated successfully",
                    null
                );
            } else {
                return ResponseUtil.sendError(res, 404, "User not found", null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await this.userService.deleteUser(id);
            if (success) {
                return ResponseUtil.sendResponse(
                    res,
                    200,
                    "User deleted successfully",
                    null
                );
            } else {
                return ResponseUtil.sendError(res, 404, "User not found", null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }
    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await this.userService.findUserById(id);
            if (user) {
                return ResponseUtil.sendResponse(
                    res,
                    200,
                    "User retrieved successfully",
                    user
                );
            } else {
                return ResponseUtil.sendError(res, 404, "User not found", null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { identifier, password } = LoginSchema.parse(req.body);
            const token: string | null = await this.userService.authenticate(
                identifier,
                password
            );
            if (token) {
                res.cookie("bondflix-auth-jwt", token, {
                    maxAge: JWT_COOKIE_MAX_AGE,
                    httpOnly: true,
                });
                return ResponseUtil.sendResponse(res, 200, "Login successful", null);
            } else {
                return ResponseUtil.sendError(
                    res,
                    404,
                    "Authentication failed",
                    null
                );
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const { username, name, email, password } = RegisterSchema.parse(
                req.body
            );
            const success = await this.userService.createUser(
                username,
                name,
                email,
                password,
                false
            );
            if (success) {
                return ResponseUtil.sendResponse(
                    res,
                    200,
                    "Registration successful",
                    null
                );
            } else {
                return ResponseUtil.sendError(
                    res,
                    500,
                    "Registration failed",
                    null
                );
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("bondflix-auth-jwt");
            return ResponseUtil.sendResponse(
                res,
                200,
                "Logout successful",
                null
            );
        } catch (error) {
            handle_error(res, error);
        }
    }

    async autoLogin(req: Request, res: Response) {
        try {
            const token = req.cookies["bondflix-auth-jwt"];

            if (!token) {
                return ResponseUtil.sendError(res, 404, "No token", null);
            }

            const decoded = verifyJWT(token);

            //TODO: extract to a function
            if (decoded.payload) {
                // @ts-ignore
                const { userId, username, name, expiresIn, issuedAt, isAdmin } =
                    decoded.payload;
                // @ts-ignore
                req.userId = userId;
                // @ts-ignore
                req.username = username;
                // @ts-ignore
                req.name = name;
                // @ts-ignore
                req.expiresIn = expiresIn;
                // @ts-ignore
                req.issuedAt = issuedAt;
                // @ts-ignore
                req.isAdmin = isAdmin;
                return ResponseUtil.sendResponse(
                    res,
                    200,
                    "Login successful",
                    null
                );
            }
        } catch (error) {
            handle_error(res, error);
        }
    }
}
