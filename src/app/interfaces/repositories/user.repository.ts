import {User} from "@prisma/client";

export interface UserRepository {
    findById(id: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findUserByIdentifier(identifier: string): Promise<User | null>;
    create(user: User): Promise<void>;
    update(user: Partial<User>): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<User[] | null>;
}
