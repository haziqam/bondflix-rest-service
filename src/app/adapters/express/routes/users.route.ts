import {Request, Response, Router} from 'express';
import {UserController} from "../../../application/controllers/user.controller";


export function userRoutes(controller: UserController): Router {
    const router = Router();
    router.post('/user', (req: Request, res: Response) => {
        controller.getUser(req, res).then(r => {});
    })
    return router;
}