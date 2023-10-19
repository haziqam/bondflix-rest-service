import {UserController} from "../application/controllers/user.controller";
import {ServiceContainer} from "./service.container";


export class ControllerContainer {
    private _userController: UserController;
    constructor(serviceContainer : ServiceContainer) {
        this._userController = new UserController(serviceContainer.userService);
    }

    get userController(): UserController {
        return this._userController;
    }

    set userController(value: UserController) {
        this._userController = value;
    }
}
