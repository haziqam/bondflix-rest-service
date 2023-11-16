import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {UserService} from "../../../application/services/user.service";

export function access_picture_middleware(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.query.id) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }

            //@ts-ignore
            const userId = parseInt(req.query.id, 10);
            const userData = await userService.findUserById(userId);
            //@ts-ignore
            req.filePath = userData?.pp_url;
            //@ts-ignore
            req.fileType = "picture";
            next();

        } catch (error) {
            console.log(error)
            return ResponseUtil.sendError(res, 401, "Unauthorized", error);
        }
    };
}