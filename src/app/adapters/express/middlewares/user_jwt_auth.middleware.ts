import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {verifyJWT} from "../../../utils/jwt.utils";

export function user_jwt_middleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies["bondflix-auth-jwt"];

    if (!token) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }

    try {
        const decoded = verifyJWT(token);
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
            next();
        } else {
            return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        }
    } catch (error) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }
}
