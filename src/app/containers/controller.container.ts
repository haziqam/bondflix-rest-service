import {UserController} from "../application/controllers/user.controller";
import {ServiceContainer} from "./service.container";
export class ControllerContainer {
    private static instance: ControllerContainer | null = null;
    private _userController: UserController;

    private constructor(serviceContainer: ServiceContainer) {
        this._userController = new UserController(serviceContainer.userService);
    }
    static getInstance(serviceContainer: ServiceContainer): ControllerContainer {
        if (!ControllerContainer.instance) {
            ControllerContainer.instance = new ControllerContainer(serviceContainer);
        }
        return ControllerContainer.instance;
    }

    get userController(): UserController {
        return this._userController;
    }

    set userController(value: UserController) {
        this._userController = value;
    }
}
