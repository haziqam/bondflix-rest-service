import {PrismaClient} from "@prisma/client";
import {RepositoryContainer} from './containers/repository.container';
import {ServiceContainer} from "./containers/service.container";
import {UserRepositoryPrisma} from "./adapters/prisma/database/user.repository.prisma";
import {ContentRepositoryPrisma} from "./adapters/prisma/database/content.repository.prisma";
import {DirectorRepositoryPrisma} from "./adapters/prisma/database/director.repository.prisma";
import {GenreRepositoryPrisma} from "./adapters/prisma/database/genre.repository.prisma";
import {ActorRepositoryPrisma} from "./adapters/prisma/database/actor.repository.prisma";
import {CategoryRepositoryPrisma} from "./adapters/prisma/database/category.repository.prisma";


export function initContainer() : ServiceContainer {
    /**
     * Initialize Prisma Client
     */
    const prismaClient = new PrismaClient();
    prismaClient.$connect();

    /**
     * Initialize Redis Client
     */

    /**
     * Initialize SOAP Client
     */

    /**
     * Initialize Repositories
     */
    const userRepository = new UserRepositoryPrisma();
    const contentRepository = new ContentRepositoryPrisma();
    const directorRepository = new DirectorRepositoryPrisma();
    const categoryRepository = new CategoryRepositoryPrisma()
    const genreRepository = new GenreRepositoryPrisma();
    const actorRepository = new ActorRepositoryPrisma();
    const repositoryContainer = RepositoryContainer.getInstance(
        userRepository,
        contentRepository,
        categoryRepository,
        directorRepository,
        genreRepository,
        actorRepository
    );

    /**
     * Initialize Services
     */
    return ServiceContainer.getInstance(repositoryContainer);
}
