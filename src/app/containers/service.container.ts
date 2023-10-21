import {UserService} from '../application/services/user.service';
import {RepositoryContainer} from './repository.container';

export class ServiceContainer {
    private static instance: ServiceContainer;
    private userService: UserService;

    private constructor(repositoryContainer: RepositoryContainer) {
        this.userService = new UserService(repositoryContainer.getUserRepository());
    }

    public static getInstance(repositoryContainer: RepositoryContainer): ServiceContainer {
        if (!ServiceContainer.instance) {
            ServiceContainer.instance = new ServiceContainer(repositoryContainer);
        }
        return ServiceContainer.instance;
    }

    public getUserService(): UserService {
        return this.userService;
    }
}
