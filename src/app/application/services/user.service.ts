import {User} from '@prisma/client';
import {UserRepository} from "../../interfaces/repositories/user.repository";
import {compareHashedString, hashString} from "../../utils/hash_string.utils";
import {signJWT} from "../../utils/jwt.utils";


/**
 * What to do in Services:
 * 1. Implement Business Logic
 * 2. Handle Database Operations
 * 3. Enforce Business Rules
 * 4. Don't Access HTTP Request/Response
 * 5. Validate / Sanitize Input using Zod
 */
export class UserService implements UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async authenticate(identifier: string, password: string) : Promise<string| null> {
        const user = await this.userRepository.findUserByIdentifier(identifier);

        if (!user) {
            return null;
        }
        const success = await compareHashedString(password, user.hashedPassword);
        if (!success) {
            return null;
        }
        const jwtClaims = {
            userId: user.id,
            username: user.username,
            expiresIn: 60 * 60 * 3,
            issuedAt: Math.floor(Date.now() / 1000),
        };

        return signJWT(jwtClaims, "3h");
    }

    async register(username: string, name: string, email: string, password: string): Promise<boolean | null> {
        const hashedPassword = await hashString(password);

        if (hashedPassword) {
            //@ts-ignore
            const newUser: User = {
                username,
                name,
                email,
                hashedPassword,
            };

            //@ts-ignore
            await this.userRepository.create(newUser);
            return true;
        } else {
            return false;
        }
    }

}
