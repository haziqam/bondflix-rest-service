import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../../utils/response.utils";
import {ContentService} from "../../../application/services/content.service";
import {SubscriptionService} from "../../../application/services/subscription.service";

export function access_thumbnail_middleware(contentService: ContentService, subscriptionService: SubscriptionService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.query.id) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }

            //@ts-ignore
            const contentId = parseInt(req.query.id, 10);
            const contentData = await contentService.findContentById(contentId);
            //@ts-ignore
            req.filePath = contentData?.thumbnail_file_path;
            //@ts-ignore
            req.fileType = "thumbnail";
            next();

        } catch (error) {
            console.log(error)
            return ResponseUtil.sendError(res, 401, "Unauthorized", error);
        }
    };
}

