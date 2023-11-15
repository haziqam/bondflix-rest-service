import {Content} from "@prisma/client";

export interface ContentRepository {
    findAll(): Promise<Content[] | null>;
    findById(id: number): Promise<Content | null>;
    findByTitle(title: string): Promise<Content | null>;
    create(content: Content): Promise<Content>;
    update(content: Partial<Content>): Promise<void>;
    delete(id: number): Promise<void>;
    associateGenres(contentId: number, genres: number[]): Promise<void>;
    associateCategories(contentId: number, categories: number[]): Promise<void>;
    findContentByCreatorId(creatorId: number): Promise<Content[] | null>;
}
