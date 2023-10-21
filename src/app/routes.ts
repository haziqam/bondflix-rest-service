import {Express} from "express";
import userRoutes from "./adapters/express/routes/users.route";
import healthRoutes from "./adapters/express/routes/health.route";
import authRoutes from "./adapters/express/routes/auth.route";
import {ControllerContainer} from "./containers/controller.container";
export function routes(app: Express, containers: ControllerContainer){
    app.use('/api/v1/health', healthRoutes);
    app.use('/api/v1/user', userRoutes(containers));
    app.use('/api/v1/auth', authRoutes(containers))
}