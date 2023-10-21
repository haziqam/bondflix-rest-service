import { UserService } from '../application/services/user.service';
import { RepositoryContainer } from './repository.container';

export class ServiceContainer {
    private static instance: ServiceContainer | null = null;
    private _userService: UserService;

    private constructor(repositoryContainer: RepositoryContainer) {
        this._userService = new UserService(repositoryContainer.userRepository);
    }

    static getInstance(repositoryContainer: RepositoryContainer): ServiceContainer {
        if (!ServiceContainer.instance) {
            ServiceContainer.instance = new ServiceContainer(repositoryContainer);
        }
        return ServiceContainer.instance;
    }

    get userService(): UserService {
        return this._userService;
    }
}
