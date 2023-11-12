import {PrismaClient} from "@prisma/client";
import {RepositoryContainer} from './containers/repository.container';
import {ServiceContainer} from "./containers/service.container";
import {UserRepositoryPrisma} from "./adapters/prisma/database/user.repository.prisma";
import {ContentRepositoryPrisma} from "./adapters/prisma/database/content.repository.prisma";
import {GenreRepositoryPrisma} from "./adapters/prisma/database/genre.repository.prisma";
import {SponsorRepositoryPrisma} from "./adapters/prisma/database/sponsor.repository.prisma";
import {CategoryRepositoryPrisma} from "./adapters/prisma/database/category.repository.prisma";
import {SoapClient} from "./adapters/soap/soap.client";


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
     * Initialize SOAP Service
     */
    // @ts-ignore
    SoapClient.getInstance(process.env.SOAP_SERVICE_URL);

    /**
     * Initialize Repositories
     */
    const userRepository = new UserRepositoryPrisma();
    const contentRepository = new ContentRepositoryPrisma();
    const categoryRepository = new CategoryRepositoryPrisma()
    const genreRepository = new GenreRepositoryPrisma();
    const actorRepository = new SponsorRepositoryPrisma();
    const repositoryContainer = RepositoryContainer.getInstance(
        userRepository,
        contentRepository,
        categoryRepository,
        genreRepository,
        actorRepository
    );

    /**
     * Initialize Services
     */
    return ServiceContainer.getInstance(repositoryContainer);
}
