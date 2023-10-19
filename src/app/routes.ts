import {Express} from "express";
import userRoutes from "./adapters/express/routes/users.route";
import healthRoutes from "./adapters/express/routes/health.route";
export function routes(app: Express){
    app.use('/api/v1/health', healthRoutes);
    app.use('/api/v1/user', userRoutes);
}