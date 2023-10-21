import {Request, Response, NextFunction} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {verifyJWT} from "../../../utils/jwt.utils";

export function jwt_middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }

    try {
        const decoded = verifyJWT(token);
        if (decoded){
            //@ts-ignore
            req.username = decoded.username;
            //@ts-ignore
            req.name = decoded.name
            //@ts-ignore
            req.expiresIn = decoded.expiresIn;
            //@ts-ignore
            req.issuedAt = decoded.issuedAt;
            next();
        } else {
            return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        }
    } catch (error) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }
}

