import {Request, Response, Router} from "express";
import {jwt_middleware} from "../middlewares/jwt_auth.middleware";
import {GenreController} from "../../../application/controllers/genre.controller";

export function genreRoutes(controller: GenreController): Router {
    const router = Router();

    /**
     * Find all genre route
     */
    router.get('/', jwt_middleware, (req: Request, res: Response) => {
        controller.getAllGenre(req, res).then(r => {});
    })

    /**
     * Find genre by id route
     */
    router.get('/:id', jwt_middleware, (req: Request, res: Response) => {
        controller.getGenreById(req, res).then(r => {});
    })

    /**
     * Find genre by name
     * Although better if I change this to use query instead of params.
     */
    router.get('/:name', jwt_middleware, (req: Request, res: Response) => {
        controller.getGenreByName(req, res).then(r => {});
    })

    /**
     * Create genre by id
     */
    router.post('/', jwt_middleware, (req: Request, res: Response) => {
        controller.createGenre(req, res).then(r => {});
    })

    /**
     * Update genre by id
     */
    router.put('/:id', jwt_middleware, (req: Request, res: Response) => {
        controller.updateGenre(req, res).then(r => {});
    })

    /**
     * Delete genre by id
     */
    router.delete('/:id', jwt_middleware, (req: Request, res: Response) => {
        controller.deleteGenre(req, res).then(r => {});
    })


    return router;
}