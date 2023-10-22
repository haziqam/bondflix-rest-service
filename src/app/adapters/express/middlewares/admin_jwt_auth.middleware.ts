import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../../../utils/response.utils";
import { verifyJWT } from "../../../utils/jwt.utils";

export function admin_jwt_middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }

    const tokenWithoutBearer = token.substring(7);

    try {
        const decoded = verifyJWT(tokenWithoutBearer);
        if (decoded.payload) {
            //@ts-ignore
            const { username, name, expiresIn, issuedAt, isAdmin } = decoded.payload;

            const isAdminBool = isAdmin === 'true';

            if (isAdminBool) {
                //@ts-ignore
                req.username = username;
                //@ts-ignore
                req.name = name;
                //@ts-ignore
                req.expiresIn = expiresIn;
                //@ts-ignore
                req.issuedAt = issuedAt;
                //@ts-ignore
                req.isAdmin = isAdminBool;
                next();
            } else {
                return ResponseUtil.sendError(res, 403, "Forbidden", null);
            }
        } else {
            return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        }
    } catch (error) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }
}
