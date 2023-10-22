import {Request, Response, Router} from 'express';
import {ContentController} from '../../../application/controllers/content.controller';
import {jwt_middleware} from "../middlewares/jwt_auth.middleware";

export function contentRoutes(controller: ContentController): Router {
    const router = Router();

    /**
     * Create content
     */
    router.post('/', (req: Request, res: Response) => {
        controller.createContent(req, res).then(() => {});
    });

    /**
     * Update content by id
     */
    router.put('/:id', jwt_middleware, (req: Request, res: Response) => {
        controller.updateContent(req, res).then(() => {});
    });

    /**
     * Delete content by id
     */
    router.delete('/:id', jwt_middleware,(req: Request, res: Response) => {
        controller.deleteContent(req, res).then(() => {});
    });

    /**
     * Get content by id
     */
    router.get('/:id',jwt_middleware, (req: Request, res: Response) => {
        controller.getContent(req, res).then(() => {});
    });

    /**
     * Get all contents
     */
    router.get('/', jwt_middleware,(req: Request, res: Response) => {
        controller.getAllContent(req, res).then(()=> {});
    });

    //TODO: Probably need to search based on genre, categories, actors, directors.

    return router;
}
