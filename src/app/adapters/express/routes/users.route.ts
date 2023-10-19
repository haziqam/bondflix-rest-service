import express from 'express';

const userRoutes = express.Router();
import { controllerContainer } from '../../../bootstrap';

userRoutes.get('/', controllerContainer.userController.getUser);

export default userRoutes;