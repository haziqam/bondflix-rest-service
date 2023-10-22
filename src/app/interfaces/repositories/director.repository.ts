import {Director} from "@prisma/client";

export interface DirectorRepository {
    findById(id: number): Promise<Director | null>;
    findByName(name: string): Promise<Director | null>;
    create(director: Director): Promise<void>;
    update(director: Director): Promise<void>;
    delete(id: number): Promise<void>;
}
