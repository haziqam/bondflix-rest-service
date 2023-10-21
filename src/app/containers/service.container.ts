import {UserService} from '../application/services/user.service';
import {RepositoryContainer} from './repository.container';
import {ContentService} from "../application/services/content.service";

export class ServiceContainer {
    private static instance: ServiceContainer;
    private userService: UserService;
    private contentService: ContentService;

    private constructor(repositoryContainer: RepositoryContainer) {
        this.userService = new UserService(repositoryContainer.getUserRepository());
        this.contentService = new ContentService(repositoryContainer.getContentRepository());
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

    public getContentService(): ContentService {
        return this.contentService;
    }
}
