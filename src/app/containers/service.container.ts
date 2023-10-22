import {UserService} from '../application/services/user.service';
import {RepositoryContainer} from './repository.container';
import {ContentService} from "../application/services/content.service";
import {GenreService} from "../application/services/genre.service";
import {CategoryService} from "../application/services/category.service";

export class ServiceContainer {
    private static instance: ServiceContainer;
    private userService: UserService;
    private contentService: ContentService;
    private genreService: GenreService;
    private categoryService: CategoryService;

    private constructor(repositoryContainer: RepositoryContainer) {
        this.userService = new UserService(repositoryContainer.getUserRepository());
        this.contentService = new ContentService(repositoryContainer.getContentRepository());
        this.genreService = new GenreService(repositoryContainer.getGenreRepository());
        this.categoryService = new CategoryService(repositoryContainer.getCategoryRepository());
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

    public getGenreService(): GenreService {
        return this.genreService;
    }

    public getCategoryService(): CategoryService {
        return this.categoryService;
    }
}
