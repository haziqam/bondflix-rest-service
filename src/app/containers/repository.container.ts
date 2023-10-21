import { UserRepository } from '../interfaces/repositories/user.repository';

export class RepositoryContainer {
    private static instance: RepositoryContainer | null = null;
    private _userRepository: UserRepository;

    private constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    static getInstance(userRepository: UserRepository): RepositoryContainer {
        if (!RepositoryContainer.instance) {
            RepositoryContainer.instance = new RepositoryContainer(userRepository);
        }
        return RepositoryContainer.instance;
    }

    get userRepository(): UserRepository {
        return this._userRepository;
    }
}
