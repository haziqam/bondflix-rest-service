import {Express, NextFunction, Request, Response} from "express";
import {userRoutes} from "./adapters/express/routes/users.route";
import {authRoutes} from "./adapters/express/routes/auth.route";
import {UserController} from "./application/controllers/user.controller";
import {ServiceContainer} from "./containers/service.container";
import {ContentController} from "./application/controllers/content.controller";
import {SponsorController} from "./application/controllers/sponsor.controller";
import {contentRoutes} from "./adapters/express/routes/content.route";
import {GenreController} from "./application/controllers/genre.controller";
import {genreRoutes} from "./adapters/express/routes/genre.route";
import {ResponseUtil} from "./utils/response.utils";
import {CategoryController} from "./application/controllers/category.controller";
import {categoryRoutes} from "./adapters/express/routes/category.route";
import {sponsorRoutes} from "./adapters/express/routes/sponsor.route";
import {SubscriptionController} from "./application/controllers/subscription.controller";
import {subscriptionRoutes} from "./adapters/express/routes/subscription.route";
import {access_content_middleware} from "./adapters/express/middlewares/access_content.middleware";
import {serve_file} from "./adapters/express/middlewares/serve_file.middleware";
import {access_thumbnail_middleware} from "./adapters/express/middlewares/access_thumbnail.middleware";
import {access_picture_middleware} from "./adapters/express/middlewares/access_picture.middleware";

export function routes(app: Express, container: ServiceContainer){
    const userController = new UserController(container.getUserService());
    const contentController = new ContentController(container.getContentService(), container.getUserService(), container.getSubscriptionService());
    const genreController = new GenreController(container.getGenreService());
    const categoryController = new CategoryController(container.getCategoryService());
    const sponsorController = new SponsorController(container.getSponsorService());
    const subscriptionController = new SubscriptionController(container.getSubscriptionService(), container.getUserService());

    app.use('/api/v1/users', userRoutes(userController));
    app.use('/api/v1/auth', authRoutes(userController));
    app.use('/api/v1/contents', contentRoutes(contentController));
    app.use('/api/v1/genres', genreRoutes(genreController));
    app.use('/api/v1/categories', categoryRoutes(categoryController));
    app.use('/api/v1/sponsors', sponsorRoutes(sponsorController));
    app.use('/api/v1/subscriptions', subscriptionRoutes(subscriptionController));
    app.use('/static/thumbnails', access_thumbnail_middleware(container.getContentService(), container.getSubscriptionService()), serve_file);
    app.use('/static/pictures', access_picture_middleware(container.getUserService()), serve_file);
    app.use('/static/contents', access_content_middleware(container.getContentService(), container.getSubscriptionService()), serve_file);

    // @ts-ignore

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