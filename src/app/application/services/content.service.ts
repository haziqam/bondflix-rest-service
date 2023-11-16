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
        visibility: boolean,
        contentFilePath: string,
        thumbnailFilePath: string
    ): Promise<Content | null> {
        //@ts-ignore
        const newContent: Content = {
            title: title,
            creator_id: creator_id,
            description: description,
            visibility: visibility,
            content_file_path: contentFilePath,
            thumbnail_file_path: thumbnailFilePath,
            uploaded_at: new Date(),
        };

        return await this.contentRepository.create(newContent);
    }

    async updateContent(contentId: number, updatedContent: Partial<Content>): Promise<boolean> {
        const existingContent = await this.contentRepository.findById(contentId);
        if (!existingContent) {
            return false;
        }

        if (existingContent.content_file_path !== null && existingContent.thumbnail_file_path !== null) {
            await deleteFile(existingContent.content_file_path)
            await deleteFile(existingContent.thumbnail_file_path)
        }

        updatedContent.id = contentId;
        await this.contentRepository.update(updatedContent);
        return true;
    }

    async addAssociation(contentId: number, genres: number[], categories: number[], sponsors: number[]): Promise<boolean> {
        const existingContent = await this.contentRepository.findById(contentId);
        if (!existingContent) {
            return false;
        }
        try {
            await this.contentRepository.associateGenres(contentId, genres);
            await this.contentRepository.associateCategories(contentId, categories);
            await this.contentRepository.associateSponsors(contentId, sponsors);
            return true;
        } catch (error) {
            console.error('Error associating genres and categories:', error);
            return false;
        }
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
        const content = await this.contentRepository.findById(contentId);
        // @ts-ignore
        if (content.user) {
            //@ts-ignore
            const {hashedPassword, ...userWithoutPassword} = content.user;
            //@ts-ignore
            return {...content, user: userWithoutPassword};
        }
        return content;
    }

    async findContentByCreatorId(creatorId: number) : Promise<Content[] | null> {
        return await this.contentRepository.findContentByCreatorId(creatorId);
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
