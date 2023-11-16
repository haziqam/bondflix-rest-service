import {Request, Response, Router} from 'express';
import {UserController} from "../../../application/controllers/user.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";
import {uploadFile} from "../../../utils/upload_file.utils";
import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {ResponseUtil} from "../../../utils/response.utils";
import {get_subscriber_email_middleware} from "../middlewares/get_subscriber_email.middleware";

export function userRoutes(controller: UserController): Router {
    const router = Router();

    /**
     * Get all user and username query
     */
    router.get('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.getUsers(req, res).then(() => {});
    })

    router.get('/search', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getUserByName(req, res).then(() => {});
    })

    /**
     * Get user by ID
     */
    router.get('/:id', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getUserById(req, res).then(() => {});
    });

    /**
     * Create a new user
     */
    router.post('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.createUser(req, res).then(() => {});
    });

    /**
     * Update user by ID
     */
    router.put('/:id', user_jwt_middleware, uploadFile.fields([
        { name: 'picture_file', maxCount: 1 },
    ]), (req: Request, res: Response) => {
        controller.updateUser(req, res).then(() => {});
    });

    /**
     * Delete user by ID
     */
    router.delete('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.deleteUser(req, res).then(() => {});
    });

    /**
     * Get Subscriber Emails
     */
    router.get("/subscription/emails/:creatorId", get_subscriber_email_middleware, (req: Request, res: Response) => {
        controller.getSubscriptionEmail(req, res).then(() => {});
    })

    return router;
}