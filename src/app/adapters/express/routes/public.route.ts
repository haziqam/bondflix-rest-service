import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {Request, Response, Router} from "express";
import {SubscriptionController} from "../../../application/controllers/subscription.controller";
import {PublicController} from "../../../application/controllers/public.controller";
import {uploadFile} from "../../../utils/upload_file.utils";


export function publicRoutes(controller: PublicController): Router {
    const router = Router();

    router.post("/upload", uploadFile.single('file'), (req: Request, res: Response) => {
        controller.uploadFile(req, res)
    })

    router.delete("/upload/delete", (req: Request, res: Response) => {
        controller.deleteFile(req, res).then(() => {})
    })

    return router;
}