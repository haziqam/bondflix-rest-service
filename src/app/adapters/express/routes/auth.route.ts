import {Request, Response, Router} from 'express';
import {UserController} from "../../../application/controllers/user.controller";

export function authRoutes(controller: UserController): Router {
    const router = Router();
    router.post('/login', (req: Request, res: Response) => {
        controller.login(req, res).then(r => {});
    })
    router.post('/register', (req: Request, res: Response) => {
        controller.signup(req, res).then(r => {});
    })
    return router;
}



