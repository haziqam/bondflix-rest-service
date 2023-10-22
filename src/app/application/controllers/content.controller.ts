import {Request, Response} from 'express';
import {ContentService} from '../services/content.service';
import {ResponseUtil} from '../../utils/response.utils';
import {CreateContentSchema} from "../../schema/content/create_content.schema";
import {UpdateContentSchema} from "../../schema/content/update_content.schema";

export class ContentController {
    private contentService: ContentService;

    constructor(contentService: ContentService) {
        this.contentService = contentService;
    }

    async createContent(req: Request, res: Response) {
        try {
            const { title, description, content_file_path, thumbnail_file_path } = CreateContentSchema.parse(req.body);

            const release_date = new Date(req.body.release_date);

            const createdContent = await this.contentService.createContent(
                title,
                description,
                release_date,
                content_file_path,
                thumbnail_file_path
            );

            if (createdContent) {
                return ResponseUtil.sendResponse(res, 201, 'Content created successfully', createdContent);
            } else {
                return ResponseUtil.sendError(res, 500, 'Content creation failed', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }


    async updateContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id, 10);
            const { ...updatedContent } = UpdateContentSchema.parse(req.body);
            if ('release_date' in updatedContent) {
                // @ts-ignore
                updatedContent.release_date = new Date(updatedContent.release_date);
            }
            //@ts-ignore
            const success = await this.contentService.updateContent(contentId, updatedContent);

            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Content updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found or update failed', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

    async deleteContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id, 10);
            const success = await this.contentService.deleteContent(contentId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Content deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found or deletion failed', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

    async getContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id, 10);

            const content = await this.contentService.findContentById(contentId);

            if (content) {
                return ResponseUtil.sendResponse(res, 200, 'Content retrieved successfully', content);
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

    async getAllContent(req: Request, res: Response) {
        try {
            const allContent = await this.contentService.getAllContents();

            if (allContent && allContent.length > 0) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allContent);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No content found', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

}
