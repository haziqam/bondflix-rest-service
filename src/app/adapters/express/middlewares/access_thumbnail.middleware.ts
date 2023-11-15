import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {ContentService} from "../../../application/services/content.service";
import {SubscriptionService} from "../../../application/services/subscription.service";

export function access_thumbnail_middleware(contentService: ContentService, subscriptionService: SubscriptionService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // const token = req.cookies["bondflix-auth-jwt"];
        //
        // if (!token) {
        //     return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        // }

        try {
            // const decoded = verifyJWT(token);
            // if (!decoded.payload) {
            //     return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            // }
            //
            // //@ts-ignore
            // const { userId, username, name, expiresIn, issuedAt, isAdmin } = decoded.payload;
            // //@ts-ignore
            // req.userId = userId;
            // //@ts-ignore
            // req.username = username;
            // //@ts-ignore
            // req.name = name;
            // //@ts-ignore
            // req.expiresIn = expiresIn;
            // //@ts-ignore
            // req.issuedAt = issuedAt;
            // //@ts-ignore
            // req.isAdmin = isAdmin;

            if (!req.query.id) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }

            //@ts-ignore
            const contentId = parseInt(req.query.id, 10);
            const contentData = await contentService.findContentById(contentId);
            //@ts-ignore
            req.filePath = contentData?.thumbnail_file_path;
            next();

        } catch (error) {
            console.log(error)
            return ResponseUtil.sendError(res, 401, "Unauthorized", error);
        }
    };
}

