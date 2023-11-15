import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {Request, Response, Router} from "express";
import {PublicController} from "../../../application/controllers/public.controller";
import {uploadFile} from "../../../utils/upload_file.utils";
import {access_content_middleware} from "../middlewares/access_content.middleware";
import {ContentService} from "../../../application/services/content.service";
import {SubscriptionService} from "../../../application/services/subscription.service";
import {ResponseUtil} from "../../../utils/response.utils";


export function publicRoutes(controller: PublicController, contentService: ContentService, subscriptionService: SubscriptionService): Router {
    const router = Router();

    router.post("/upload", uploadFile.single('file'), (req: Request, res: Response) => {
        controller.uploadFile(req, res)
    })

    router.delete("/upload/delete", (req: Request, res: Response) => {
        controller.deleteFile(req, res).then(() => {})
    })

    router.get("/:id", access_content_middleware(contentService, subscriptionService), (req: Request, res: Response) => {return ResponseUtil.sendResponse(res, 200, "ok", null)})

    return router;
}