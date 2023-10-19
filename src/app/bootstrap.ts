import { PrismaClient } from "@prisma/client";
import { RepositoryContainer } from './containers/repository.container';
import { ServiceContainer } from "./containers/service.container";
import { UserRepositoryPrisma } from "./adapters/prisma/database/user.repository.prisma";
import {ControllerContainer} from "./containers/controller.container";


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
const repositoryContainer = new RepositoryContainer(userRepository);

/**
 * Initialize Services
 */
const serviceContainer = new ServiceContainer(repositoryContainer);

/**
 * Initialize Handlers
 */
const controllerContainer = new ControllerContainer(serviceContainer);
export { controllerContainer };
