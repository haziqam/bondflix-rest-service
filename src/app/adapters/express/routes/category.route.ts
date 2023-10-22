import {Request, Response, Router} from "express";
import {user_jwt_middleware} from "../middlewares/user_jwt_auth.middleware";
import {CategoryController} from "../../../application/controllers/category.controller";
import {admin_jwt_middleware} from "../middlewares/admin_jwt_auth.middleware";

export function categoryRoutes(controller: CategoryController): Router {
    const router = Router();

    /**
     * Find all category route
     */
    router.get('/', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getAllCategory(req, res).then(() => {});
    })

    /**
     * Find category by id route
     */
    router.get('/:id', user_jwt_middleware, (req: Request, res: Response) => {
        controller.getCategoryById(req, res).then(() => {});
    })

    /**
     * Find category by name
     * Although better if I change this to use query instead of params.
     */
    router.get('/:name',  user_jwt_middleware, (req: Request, res: Response) => {
        controller.getCategoryByName(req, res).then(() => {});
    })

    /**
     * Create category
     */
    router.post('/', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.createCategory(req, res).then(() => {});
    })

    /**
     * Update category by id
     */
    router.put('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.updateCategory(req, res).then(() => {});
    })

    /**
     * Delete category by id
     */
    router.delete('/:id', admin_jwt_middleware, (req: Request, res: Response) => {
        controller.deleteCategory(req, res).then(() => {});
    })


    return router;
}