import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {Request, Response, Router} from "express";
import {SubscriptionController} from "../../../application/controllers/subscription.controller";
import {PublicController} from "../../../application/controllers/public.controller";


export function publicRoutes(controller: PublicController): Router {
    const router = Router();

    router.post("/upload", (req: Request, res: Response) => {
        controller.uploadFile(req, res)
    })

    return router;
}