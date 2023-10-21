import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {routes} from "./routes";
import {initializeContainers} from "./bootstrap";
import {ControllerContainer} from "./containers/controller.container";

const app = express();
const port = process.env.PORT || 3000;
dotEnv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const containers: { controllerContainer: ControllerContainer } = initializeContainers();
routes(app, containers.controllerContainer);
const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log('Fail to initialize server: ', error);
        process.exit(1);
    }
}

startServer().then(() => {});