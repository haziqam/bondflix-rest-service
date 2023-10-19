import {UserService} from "../application/services/user.service";
import {RepositoryContainer} from "./repository.container";

export class ServiceContainer {
    private _userService : UserService;
    constructor(
        repositoryContainer: RepositoryContainer
    ) {
        this._userService = new UserService(repositoryContainer.userRepository);
    }

    get userService(): UserService {
        return this._userService;
    }

    set userService(value: UserService) {
        this._userService = value;
    }
}
