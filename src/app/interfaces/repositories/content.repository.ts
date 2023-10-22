import {Content} from "@prisma/client";

export interface ContentRepository {
    findAll(): Promise<Content[] | null>;
    findById(id: number): Promise<Content | null>;
    findByTitle(title: string): Promise<Content | null>;
    create(content: Content): Promise<void>;
    update(content: Partial<Content>): Promise<void>;
    delete(id: number): Promise<void>;
}
