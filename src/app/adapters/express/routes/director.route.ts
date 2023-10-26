import {Request, Response, Router} from "express";
import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {DirectorController} from "../../../application/controllers/director.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";

export function directorRoutes(controller: DirectorController): Router {
    const router = Router();

    /**
     * Find all director route
     */
    router.get('/', user_jwt_middleware, (req: Request, res: Response) => {
        if (req.query.name) {
            controller.getDirectorByName(req, res).then(() => {});
        }
        else {
            controller.getAllDirector(req, res).then(() => {});
        }
    })

    /**
     * Find director by id route
     */
    router.get('/:id', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getDirectorById(req, res).then(() => {});
    })

    /**
     * Create director
     */
    router.post('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.createDirector(req, res).then(() => {});
    })

    /**
     * Update director by id
     */
    router.put('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.updateDirector(req, res).then(() => {});
    })

    /**
     * Delete director by id
     */
    router.delete('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.deleteDirector(req, res).then(() => {});
    })


    return router;
}