import { UserRepository } from '../interfaces/repositories/user.repository';
import { ContentRepository } from '../interfaces/repositories/content.repository';
import { CategoryRepository } from '../interfaces/repositories/category.repository';
import { DirectorRepository } from '../interfaces/repositories/director.repository';
import { GenreRepository } from '../interfaces/repositories/genre.repository';
import { ActorRepository } from '../interfaces/repositories/actor.repository';

export class RepositoryContainer {
    private static instance: RepositoryContainer;
    private userRepository: UserRepository;
    private contentRepository: ContentRepository;
    private categoryRepository: CategoryRepository;
    private directorRepository: DirectorRepository;
    private genreRepository: GenreRepository;
    private actorRepository: ActorRepository;

    private constructor(
        userRepository: UserRepository,
        contentRepository: ContentRepository,
        categoryRepository: CategoryRepository,
        directorRepository: DirectorRepository,
        genreRepository: GenreRepository,
        actorRepository: ActorRepository
    ) {
        this.userRepository = userRepository;
        this.contentRepository = contentRepository;
        this.categoryRepository = categoryRepository;
        this.directorRepository = directorRepository;
        this.genreRepository = genreRepository;
        this.actorRepository = actorRepository;
    }

    public static getInstance(
        userRepository: UserRepository,
        contentRepository: ContentRepository,
        categoryRepository: CategoryRepository,
        directorRepository: DirectorRepository,
        genreRepository: GenreRepository,
        actorRepository: ActorRepository
    ): RepositoryContainer {
        if (!RepositoryContainer.instance) {
            RepositoryContainer.instance = new RepositoryContainer(
                userRepository,
                contentRepository,
                categoryRepository,
                directorRepository,
                genreRepository,
                actorRepository
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

    public getDirectorRepository(): DirectorRepository {
        return this.directorRepository;
    }

    public getGenreRepository(): GenreRepository {
        return this.genreRepository;
    }

    public getActorRepository(): ActorRepository {
        return this.actorRepository;
    }
}
