import {Request, Response} from "express";
import {ResponseUtil} from "../../utils/response.utils";
import {handle_error} from "../../utils/handle_error.utils";
import {SubscriptionService} from "../services/subscription.service";

export class SubscriptionController {
    private subscriptionService: SubscriptionService;

    constructor(subscriptionService: SubscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    async subscribe(req: Request, res: Response) {
        try {
            const creatorId = parseInt(req.params.creatorId, 10);
            if (!creatorId){
                return ResponseUtil.sendError(res, 401, "Creator ID can't be empty", null);
            }
            //@ts-ignore
            const userId = req.userId;
            if (!userId) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }
            const success = await this.subscriptionService.subscribe(userId, creatorId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, "Subscription success", null);
            } else {
                return ResponseUtil.sendError(res, 500, "Subscription request failed", null);
            }
        } catch (error) {
            console.log(error)
            handle_error(res, error);
        }
    }
}