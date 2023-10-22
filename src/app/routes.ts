import {Express, NextFunction, Request, Response} from "express";
import {userRoutes} from "./adapters/express/routes/users.route";
import {authRoutes} from "./adapters/express/routes/auth.route";
import healthRoutes from "./adapters/express/routes/health.route";
import {UserController} from "./application/controllers/user.controller";
import {ServiceContainer} from "./containers/service.container";
import {ContentController} from "./application/controllers/content.controller";
import {contentRoutes} from "./adapters/express/routes/content.route";
import {GenreController} from "./application/controllers/genre.controller";
import {genreRoutes} from "./adapters/express/routes/genre.route";
import {ResponseUtil} from "./utils/response.utils";
import {CategoryController} from "./application/controllers/category.controller";
import {categoryRoutes} from "./adapters/express/routes/category.route";

export function routes(app: Express, container: ServiceContainer){
    const userController = new UserController(container.getUserService());
    const contentController = new ContentController(container.getContentService());
    const genreController = new GenreController(container.getGenreService());
    const categoryController = new CategoryController(container.getCategoryService());

    app.use('/api/v1/health', healthRoutes);
    app.use('/api/v1/users', userRoutes(userController));
    app.use('/api/v1/auth', authRoutes(userController));
    app.use('/api/v1/contents', contentRoutes(contentController));
    app.use('/api/v1/genres', genreRoutes(genreController));
    app.use('/api/v1/categories', categoryRoutes(categoryController));

    /**
     * Handling errors and not found routes
     */
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        return ResponseUtil.sendError(res, 500, "Internal Server Error", err);
    });
    app.get('*', (req: Request, res: Response) => {
        return ResponseUtil.sendError(res, 404, "Route not found", null);
    });
}