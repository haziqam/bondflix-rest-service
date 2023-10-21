import { Request, Response, Router } from 'express';
import { ContentController } from '../../../application/controllers/content.controller';

export function contentRoutes(controller: ContentController): Router {
    const router = Router();

    router.post('/', (req: Request, res: Response) => {
        controller.createContent(req, res).then(() => {});
    });

    router.put('/:id', (req: Request, res: Response) => {
        controller.updateContent(req, res).then(() => {});
    });

    router.delete('/:id', (req: Request, res: Response) => {
        controller.deleteContent(req, res).then(() => {});
    });

    router.get('/:id', (req: Request, res: Response) => {
        controller.getContent(req, res).then(() => {});
    });

    router.get('/', (req: Request, res: Response) => {
        controller.getAllContent(req, res).then(()=> {});
    });

    return router;
}
