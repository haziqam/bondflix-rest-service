import { Router } from 'express';
import { ControllerContainer } from '../../../containers/controller.container';

export default function authRoutes(containers: ControllerContainer) {
    const router = Router();

    router.post('/login', containers.userController.login);

    return router;
}
