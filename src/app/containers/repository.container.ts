import {UserRepository} from '../interfaces/repositories/user.repository';

export class RepositoryContainer {
    private static instance: RepositoryContainer;
    private userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public static getInstance(userRepository: UserRepository): RepositoryContainer {
        if (!RepositoryContainer.instance) {
            RepositoryContainer.instance = new RepositoryContainer(userRepository);
        }
        return RepositoryContainer.instance;
    }

    public getUserRepository(): UserRepository {
        return this.userRepository;
    }
}
