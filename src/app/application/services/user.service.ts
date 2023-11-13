import {User} from '@prisma/client';
import {UserRepository} from "../../interfaces/repositories/user.repository";
import {compareHashedString, hashString} from "../../utils/hash_string.utils";
import {signJWT} from "../../utils/jwt.utils";
import {deleteFile} from "../../utils/delete_file.utils";

/**
 * What to do in Services:
 * 1. Implement Business Logic
 * 2. Handle Database Operations
 * 3. Enforce Business Rules
 * 4. Don't Access HTTP Request/Response
 * 5. Validate / Sanitize Input using Zod
 */
export class UserService {
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
            name: user.name,
            expiresIn: 60 * 60 * 3,
            issuedAt: Math.floor(Date.now() / 1000),
            isAdmin: user.isAdmin,
        };

        return signJWT(jwtClaims, "3h");
    }
    async createUser(username: string, name: string, email: string, password: string, isAdmin: boolean): Promise<boolean> {
        const hashedPassword = await hashString(password);
        if (hashedPassword) {
            //@ts-ignore
            const newUser: User = {
                username: username,
                name: name,
                email: email,
                isAdmin: isAdmin,
                hashedPassword: hashedPassword,
            };

            //@ts-ignore
            await this.userRepository.create(newUser);
            return true;
        } else {
            return false;
        }
    }

    async deleteUser(id: number): Promise<boolean | null> {
         const existingUser = await this.userRepository.findById(id);
         if (!existingUser) {
             return false;
         }

         await this.userRepository.delete(id);
         return true;
    }

    async updateUser(id: number, updatedUser: Partial<User>): Promise<boolean> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            return false;
        }

        // Kalo udah ada filenya apus, terus upload yang baru
        if (existingUser.pp_url !== "default.png") {
            await deleteFile(existingUser.pp_url)
        }

        //@ts-ignore
        if (updatedUser.password) {
            //@ts-ignore
            const hashedPassword = await hashString(updatedUser.password);
            if (hashedPassword) {
                //@ts-ignore
                updatedUser.hashedPassword = hashedPassword;
            }
            //@ts-ignore
            delete updatedUser.password;
        }

        updatedUser.id = id;
        await this.userRepository.update(updatedUser);
        return true;
    }

    async findUserByUsername(username: string): Promise<User | null>{
        const existingUser = await this.userRepository.findByUsername(username);
        if (!existingUser) {
            return null;
        }

        return existingUser;
    }

    async findUserById(id: number): Promise<User | null> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            return null;
        }
        return existingUser;
    }

    async getAllUsers(): Promise<User[] | null> {
        return this.userRepository.findAll();
    }
}
