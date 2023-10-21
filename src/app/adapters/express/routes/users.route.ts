import { Router } from 'express';
import { ControllerContainer } from '../../../containers/controller.container';

export default function userRoutes(containers: ControllerContainer) {
    const router = Router();

    router.get('/', containers.userController.getUser);

    return router;
}
