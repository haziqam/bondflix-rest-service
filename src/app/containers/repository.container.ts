import {UserRepository} from "../interfaces/repositories/user.repository";

export class RepositoryContainer {
    private _userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    get userRepository(): UserRepository {
        return this._userRepository;
    }

    set userRepository(value: UserRepository) {
        this._userRepository = value;
    }
}
