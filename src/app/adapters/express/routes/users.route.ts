import {Request, Response, Router} from 'express';
import {UserController} from "../../../application/controllers/user.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";

export function userRoutes(controller: UserController): Router {
    const router = Router();
    /**
     * Get all user and username query
     */
    router.get('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.getUsers(req, res).then(() => {});
    })

    /**
     * Get user by ID
     */
    router.get('/:id', (req: Request, res: Response) => {
        controller.getUserById(req, res).then(() => {});
    });

    /**
     * Create a new user
     */
    router.post('/', (req: Request, res: Response) => {
        controller.createUser(req, res).then(() => {});
    });

    /**
     * Update user by ID
     */
    router.put('/:id', (req: Request, res: Response) => {
        controller.updateUser(req, res).then(() => {});
    });

    /**
     * Delete user by ID
     */
    router.delete('/:id', (req: Request, res: Response) => {
        controller.deleteUser(req, res).then(() => {});
    });

    return router;
}