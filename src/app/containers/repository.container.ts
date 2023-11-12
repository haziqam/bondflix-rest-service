import {UserRepository} from '../interfaces/repositories/user.repository';
import {ContentRepository} from '../interfaces/repositories/content.repository';
import {CategoryRepository} from '../interfaces/repositories/category.repository';
import {GenreRepository} from '../interfaces/repositories/genre.repository';
import {SponsorRepository} from '../interfaces/repositories/sponsor.repository';

export class RepositoryContainer {
    private static instance: RepositoryContainer;
    private userRepository: UserRepository;
    private contentRepository: ContentRepository;
    private categoryRepository: CategoryRepository;
    private genreRepository: GenreRepository;
    private sponsorRepository: SponsorRepository;

    private constructor(
        userRepository: UserRepository,
        contentRepository: ContentRepository,
        categoryRepository: CategoryRepository,
        genreRepository: GenreRepository,
        sponsorRepository: SponsorRepository
    ) {
        this.userRepository = userRepository;
        this.contentRepository = contentRepository;
        this.categoryRepository = categoryRepository;
        this.genreRepository = genreRepository;
        this.sponsorRepository = sponsorRepository;
    }

    public static getInstance(
        userRepository: UserRepository,
        contentRepository: ContentRepository,
        categoryRepository: CategoryRepository,
        genreRepository: GenreRepository,
        sponsorRepository: SponsorRepository
    ): RepositoryContainer {
        if (!RepositoryContainer.instance) {
            RepositoryContainer.instance = new RepositoryContainer(
                userRepository,
                contentRepository,
                categoryRepository,
                genreRepository,
                sponsorRepository
            );
        }
        return RepositoryContainer.instance;
    }

    public getUserRepository(): UserRepository {
        return this.userRepository;
    }

    public getContentRepository(): ContentRepository {
        return this.contentRepository;
    }

    public getCategoryRepository(): CategoryRepository {
        return this.categoryRepository;
    }

    public getGenreRepository(): GenreRepository {
        return this.genreRepository;
    }

    public getSponsorRepository(): SponsorRepository {
        return this.sponsorRepository;
    }
}
