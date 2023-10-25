import {Request, Response, Router} from "express";
import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {ActorController} from "../../../application/controllers/actor.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";

export function actorRoutes(controller: ActorController): Router {
    const router = Router();

    /**
     * Find all actor route
     */
    router.get('/', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getAllActor(req, res).then(() => {});
    })

    /**
     * Find actor by id route
     */
    router.get('/:id', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getActorById(req, res).then(() => {});
    })

    /**
     * Find actor by name
     * Although better if I change this to use query instead of params.
     */
    router.get('/:name',  user_jwt_middleware, (req: Request, res: Response) => {
        controller.getActorByName(req, res).then(() => {});
    })

    /**
     * Create actor
     */
    router.post('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.createActor(req, res).then(() => {});
    })

    /**
     * Update actor by id
     */
    router.put('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.updateActor(req, res).then(() => {});
    })

    /**
     * Delete actor by id
     */
    router.delete('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.deleteActor(req, res).then(() => {});
    })


    return router;
}