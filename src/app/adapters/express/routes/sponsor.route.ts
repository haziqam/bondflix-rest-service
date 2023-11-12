import {Request, Response, Router} from "express";
import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {SponsorController} from "../../../application/controllers/sponsor.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";

export function sponsorRoutes(controller: SponsorController): Router {
    const router = Router();

    /**
     * Find all sponsor route
     */
    router.get('/', user_jwt_middleware, (req: Request, res: Response) => {
        if (req.query.name) {
            controller.getSponsorByName(req, res).then(() => {});
        }
        else {
            controller.getAllSponsor(req, res).then(() => {});
        }
    })

    /**
     * Find sponsor by id route
     */
    router.get('/:id', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getSponsorById(req, res).then(() => {});
    })

    /**
     * Create sponsor
     */
    router.post('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.createSponsor(req, res).then(() => {});
    })

    /**
     * Update sponsor by id
     */
    router.put('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.updateSponsor(req, res).then(() => {});
    })

    /**
     * Delete sponsor by id
     */
    router.delete('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.deleteSponsor(req, res).then(() => {});
    })


    return router;
}