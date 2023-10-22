import {Content} from '@prisma/client';
import {ContentRepository} from '../../interfaces/repositories/content.repository';

export class ContentService {
    private contentRepository: ContentRepository;

    constructor(contentRepository: ContentRepository) {
        this.contentRepository = contentRepository;
    }

    async createContent(
        title: string,
        description: string,
        releaseDate: Date,
        contentFilePath: string,
        thumbnailFilePath: string
    ): Promise<Content | null> {
        //@ts-ignore
        const newContent: Content = {
            title,
            description,
            release_date: releaseDate,
            content_file_path: contentFilePath,
            thumbnail_file_path: thumbnailFilePath,
            uploaded_at: new Date(),
        };

        await this.contentRepository.create(newContent);
        return newContent;
    }

    async updateContent(contentId: number, updatedContent: Partial<Content>): Promise<boolean> {
        const existingContent = await this.contentRepository.findById(contentId);
        if (!existingContent) {
            return false;
        }
        updatedContent.id = contentId;
        await this.contentRepository.update(updatedContent);
        return true;
    }

    async deleteContent(contentId: number): Promise<boolean> {
        const existingContent = await this.contentRepository.findById(contentId);
        if (!existingContent) {
            return false;
        }

        await this.contentRepository.delete(contentId);
        return true;
    }

    async findContentById(contentId: number): Promise<Content | null> {
        return this.contentRepository.findById(contentId);
    }

    async getAllContents(): Promise<Content[] | null> {
        return this.contentRepository.findAll();
    }

    //methods for content retrieval, listing, filtering, etc.,
}
