import {Request, Response, NextFunction} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {verifyJWT} from "../../../utils/jwt.utils";

export function jwt_middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }

    const tokenWithoutBearer = token.substring(7);

    try {
        const decoded = verifyJWT(tokenWithoutBearer);
        if (decoded.payload) {
            // @ts-ignore
            const { username, name, expiresIn, issuedAt } = decoded.payload;
            // @ts-ignore
            req.username = username;
            // @ts-ignore
            req.name = name;
            // @ts-ignore
            req.expiresIn = expiresIn;
            // @ts-ignore
            req.issuedAt = issuedAt;
            console.log(decoded.payload)
            next();
        } else {
            return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        }
    } catch (error) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }
}

