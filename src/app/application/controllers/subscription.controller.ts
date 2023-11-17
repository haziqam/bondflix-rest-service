import {Request, Response} from "express";
import {ResponseUtil} from "../../utils/response.utils";
import {handle_error} from "../../utils/handle_error.utils";
import {SubscriptionService} from "../services/subscription.service";
import {UserService} from "../services/user.service";

export class SubscriptionController {
    private subscriptionService: SubscriptionService;
    private userService: UserService

    constructor(subscriptionService: SubscriptionService, userService: UserService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
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
            const isSubscribed = await this.subscriptionService.subscribe(userId, creatorId);
            if (isSubscribed) {
                return ResponseUtil.sendResponse(res, 200, "Subscription success", null);
            } else {
                return ResponseUtil.sendError(res, 500, "Subscription request failed", null);
            }
        } catch (error) {
            console.log(error)
            handle_error(res, error);
        }
    }

    async getSubscriber(req: Request, res: Response) {
        try {
            const creatorId = parseInt(req.params.creatorId, 10);
            if (!creatorId){
                return ResponseUtil.sendError(res, 401, "Creator ID can't be empty", null);
            }

            const subscriberIds = await this.subscriptionService.getSubscribers(creatorId);
            if (subscriberIds) {
                return ResponseUtil.sendResponse(res, 200, "Subscriber list", subscriberIds)
            } else {
                return ResponseUtil.sendError(res, 500, "Can't get subscribers", null)
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


    async isSubscribed(req: Request, res: Response) {
        try {
            const creatorId = parseInt(req.params.creatorId, 10);
            if (!creatorId){
                return ResponseUtil.sendError(res, 401, "Creator ID can't be empty", null);
            }

            //@ts-ignore
            const isSubscribed = await this.subscriptionService.isUserSubscribedToCreator(req.userId, creatorId)
            // @ts-ignore
            if (!isSubscribed || isSubscribed == "false" || isSubscribed == false) {
                return ResponseUtil.sendResponse(res, 200, "User is not subscribed", false)
            } else {
                return ResponseUtil.sendError(res, 404, "User subscribed", true);
            }

        } catch (error) {
            handle_error(res, error);
        }
    }
}