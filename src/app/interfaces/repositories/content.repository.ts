import { Content } from "@prisma/client";

export interface ContentRepository {
    findById(id: number): Promise<Content | null>;
    findByTitle(title: string): Promise<Content | null>;
    create(content: Content): Promise<void>;
    update(content: Content): Promise<void>;
    delete(id: number): Promise<void>;
}
