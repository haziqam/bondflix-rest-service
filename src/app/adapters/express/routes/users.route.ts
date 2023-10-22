import {Request, Response, Router} from 'express';
import {UserController} from "../../../application/controllers/user.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";

export function userRoutes(controller: UserController): Router {
    const router = Router();
    /**
     * Get all user
     */
    router.get('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.getUser(req, res).then(r => {});
    })

    //TODO: CRUD basic user.
    return router;
}