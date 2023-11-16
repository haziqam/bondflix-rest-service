import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {verifyJWT} from "../../../utils/jwt.utils";

export function get_subscriber_email_middleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {
        const token = req.headers["x-api-key"];
        if (!token || token !== process.env.SOAP_EMAIL_API_KEY) {
            return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        }
        next();
    } catch (error) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }
}
