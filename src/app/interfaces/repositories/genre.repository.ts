import { Genre } from "@prisma/client";

export interface GenreRepository {
    findById(id: number): Promise<Genre | null>;
    findByName(name: string): Promise<Genre | null>;
    create(genre: Genre): Promise<void>;
    update(genre: Genre): Promise<void>;
    delete(id: number): Promise<void>;
}
