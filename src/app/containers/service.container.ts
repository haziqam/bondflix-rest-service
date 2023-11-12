import {UserService} from '../application/services/user.service';
import {RepositoryContainer} from './repository.container';
import {ContentService} from "../application/services/content.service";
import {GenreService} from "../application/services/genre.service";
import {CategoryService} from "../application/services/category.service";
import {SponsorService} from '../application/services/sponsor.service';
import {SubscriptionService} from "../application/services/subscription.service";

export class ServiceContainer {
    private static instance: ServiceContainer;
    private userService: UserService;
    private contentService: ContentService;
    private genreService: GenreService;
    private categoryService: CategoryService;
    private sponsorService: SponsorService;
    private subscriptionService: SubscriptionService;

    private constructor(repositoryContainer: RepositoryContainer) {
        this.userService = new UserService(repositoryContainer.getUserRepository());
        this.contentService = new ContentService(repositoryContainer.getContentRepository());
        this.genreService = new GenreService(repositoryContainer.getGenreRepository());
        this.categoryService = new CategoryService(repositoryContainer.getCategoryRepository());
        this.sponsorService = new SponsorService(repositoryContainer.getSponsorRepository());
        this.subscriptionService = new SubscriptionService(repositoryContainer.getUserRepository());
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

    public getSponsorService(): SponsorService {
        return this.sponsorService;
    }

    public getSubscriptionService(): SubscriptionService {
        return this.subscriptionService;
    }
}
