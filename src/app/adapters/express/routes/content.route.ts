import {Request, Response, Router} from 'express';
import {ContentController} from '../../../application/controllers/content.controller';
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";
import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";

export function contentRoutes(controller: ContentController): Router {
    const router = Router();

    /**
     * Create content
     */
    router.post('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.createContent(req, res).then(() => {});
    });

    /**
     * Update content by id
     */
    router.put('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.updateContent(req, res).then(() => {});
    });

    /**
     * Delete content by id
     */
    router.delete('/:id', admin_jwt_middleware,(req: Request, res: Response) => {
        controller.deleteContent(req, res).then(() => {});
    });

    /**
     * Get content by id
     */
    router.get('/:id', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getContent(req, res).then(() => {});
    });

    /**
     * Get all contents
     */
    router.get('/', user_jwt_middleware,(req: Request, res: Response) => {
        controller.getAllContent(req, res).then(()=> {});
    });

    //TODO: Probably need to search based on genre, categories, actors, directors.

    return router;
}
