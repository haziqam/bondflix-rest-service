import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {Request, Response, Router} from "express";
import {SubscriptionController} from "../../../application/controllers/subscription.controller";


export function subscriptionRoutes(controller: SubscriptionController): Router {
    const router = Router();

    router.post("/subscribe/:creatorId", user_jwt_middleware, (req: Request, res: Response) => {
        controller.subscribe(req, res).then(() => {})
    })

    router.get("/subscribers/:creatorId", (req: Request, res: Response) => {
        controller.getSubscriber(req, res).then(() => {})
    })

    return router;
}