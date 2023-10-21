import {Express} from "express";
import {userRoutes} from "./adapters/express/routes/users.route";
import {authRoutes} from "./adapters/express/routes/auth.route";
import healthRoutes from "./adapters/express/routes/health.route";
import {UserController} from "./application/controllers/user.controller";
import {ServiceContainer} from "./containers/service.container";
import {ContentController} from "./application/controllers/content.controller";
import {contentRoutes} from "./adapters/express/routes/content.route";

export function routes(app: Express, container: ServiceContainer){
    const userController = new UserController(container.getUserService());
    const contentController = new ContentController(container.getContentService());
    app.use('/api/v1/health', healthRoutes);
    app.use('/api/v1/users', userRoutes(userController));
    app.use('/api/v1/auth', authRoutes(userController));
    app.use('/api/v1/contents', contentRoutes(contentController));
}