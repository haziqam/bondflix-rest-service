import {Content} from '@prisma/client';
import {ContentRepository} from '../../interfaces/repositories/content.repository';
import {deleteFile} from "../../utils/delete_file.utils";

export class ContentService {
    private contentRepository: ContentRepository;

    constructor(contentRepository: ContentRepository) {
        this.contentRepository = contentRepository;
    }

    async createContent(
        title: string,
        creator_id: number,
        description: string,
        releaseDate: Date,
        contentFilePath: string,
        thumbnailFilePath: string
    ): Promise<Content | null> {
        //@ts-ignore
        const newContent: Content = {
            title: title,
            creator_id: creator_id,
            description: description,
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

        if (existingContent.content_file_path !== null && existingContent.thumbnail_file_path !== null) {
            // @ts-ignore
            await deleteFile(existingContent.content_file_path)
            // @ts-ignore
            await deleteFile(existingContent.thumbnail_file_path)
        }

        updatedContent.id = contentId;
        await this.contentRepository.update(updatedContent);
        return true;
    }

    async deleteContent(contentId: number): Promise<boolean> {
        const existingContent = await this.contentRepository.findById(contentId);

        // @ts-ignore
        await deleteFile(existingContent.content_file_path)
        // @ts-ignore
        await deleteFile(existingContent.thumbnail_file_path)

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
        const contents: Content[] | null = await this.contentRepository.findAll();
        // @ts-ignore
        if (contents.length === 0) return null;
        // @ts-ignore
        return contents.map(content => {
            //@ts-ignore
            if (content.user) {
                //@ts-ignore
                const {hashedPassword, ...userWithoutPassword} = content.user;
                return {...content, user: userWithoutPassword};
            }
            return content;
        });
    }

}
