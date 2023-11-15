import {Request, Response} from 'express';
import {ContentService} from '../services/content.service';
import {ResponseUtil} from '../../utils/response.utils';
import {UpdateContentSchema} from "../../schema/content/update_content.schema";
import {UserService} from "../services/user.service";
import {handle_error} from "../../utils/handle_error.utils";
import {RedisClient} from "../../adapters/redis/redis.client";
import {parseToArray} from "../../utils/parse_array.utils";
import {SubscriptionService} from "../services/subscription.service";

export class ContentController {
    private contentService: ContentService;
    private userService: UserService;
    private subscriptionService: SubscriptionService;

    constructor(contentService: ContentService, userService: UserService, subscriptionService: SubscriptionService) {
        this.contentService = contentService;
        this.userService = userService;
        this.subscriptionService = subscriptionService;
    }
    async createContent(req: Request, res: Response) {
        try {
            let { title, description, genres, categories } = req.body;
            //@ts-ignore
            const creator_id = parseInt(req.userId, 10)
            const release_date = new Date(req.body.release_date);

            genres = typeof genres === 'string' ? parseToArray(genres) : [];
            categories = typeof categories === 'string' ? parseToArray(categories) : [];

            // @ts-ignore
            const contentFilePath = req.files['content_file'] ? req.files['content_file'][0].path : null;
            // @ts-ignore
            const thumbnailFilePath = req.files['thumbnail_file'] ? req.files['thumbnail_file'][0].path : null;

            const creator = await this.userService.findUserById(creator_id);
            if (!creator) {
                return ResponseUtil.sendError(res, 404, "Creator not found", null);
            }

            const createdContent = await this.contentService.createContent(
                title,
                creator_id,
                description,
                release_date,
                contentFilePath,
                thumbnailFilePath
            );

            if (createdContent) {
                await this.contentService.addGenresAndCategories(createdContent.id, genres, categories);
                return ResponseUtil.sendResponse(res, 201, 'Content created successfully', createdContent);
            } else {
                return ResponseUtil.sendError(res, 500, 'Content creation failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async updateContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id, 10);
            const existingContent = await this.contentService.findContentById(contentId);
            if (!existingContent) {
                return ResponseUtil.sendError(res, 404, "Content not found", null);
            }

            //@ts-ignore
            if (existingContent.creator_id !== req.userId && !req.isAdmin) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }

            const { ...updatedContent } = UpdateContentSchema.parse(req.body);
            if ('release_date' in updatedContent) {
                // @ts-ignore
                updatedContent.release_date = new Date(updatedContent.release_date);
            }

            //@ts-ignore
            updatedContent.content_file_path = req.files['content_file'] ? req.files['content_file'][0].path : null;
            // @ts-ignore
            updatedContent.thumbnail_file_path = req.files['thumbnail_file'] ? req.files['thumbnail_file'][0].path : null;

            if (updatedContent.creator_id) {
                const creator = await this.userService.findUserById(updatedContent.creator_id);
                if (!creator) {
                    return ResponseUtil.sendError(res, 404, "Creator not found", null);
                }
            }

            //@ts-ignore
            const success = await this.contentService.updateContent(contentId, updatedContent);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Content updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found or update failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id, 10);
            const existingContent = await this.contentService.findContentById(contentId);
            if (!existingContent) {
                return ResponseUtil.sendError(res, 404, "Content not found", null);
            }

            //@ts-ignore
            if (existingContent.creator_id !== req.userId && !req.isAdmin) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }

            const success = await this.contentService.deleteContent(contentId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Content deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found or deletion failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id, 10);

            const content = await this.contentService.findContentById(contentId);

            if (content) {
                const contentData = await this.contentService.findContentById(contentId);

                //Ambil creator id
                const creatorId = contentData?.creator_id

                //Check subscribed or not

                //@ts-ignore
                if (creatorId === req.userId || req.isAdmin){
                    return ResponseUtil.sendResponse(res, 200, "Successfully get content", content);
                }

                //@ts-ignore
                const success = await this.subscriptionService.isUserSubscribedToCreator(req.userId, creatorId);
                // @ts-ignore
                if (!success || success == "false" || success == false) {
                    return ResponseUtil.sendError(res, 401, "Unauthorized - Subscription required", null);
                } else {
                    //@ts-ignore
                    return ResponseUtil.sendResponse(res, 200, "Successfully get content", content);
                }
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getAllContent(req: Request, res: Response) {
        try {
            const redisClient = RedisClient.getInstance();
            let allContentString = await redisClient.get("allContent");

            let allContent;
            if (allContentString == null) {
                allContent = await this.contentService.getAllContents();

                allContentString = JSON.stringify(allContent);
                await redisClient.set("allContent", allContentString, 30);
            } else {
                allContent = JSON.parse(allContentString);
            }

            if (allContent) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allContent);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No content found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getContentByCreatorId(req: Request, res: Response)  {
        try {
            const creatorId = parseInt(req.params.creator_id, 10);
            const existingCreator = await this.userService.findUserById(creatorId);
            if (!existingCreator) {
                return ResponseUtil.sendError(res, 404, "Creator not found", null);
            }

            //@ts-ignore
            if (req.userId !== creatorId && !req.isAdmin) {
                return ResponseUtil.sendError(res, 401, "Unauthorized", null);
            }

            const contentData = await this.contentService.findContentByCreatorId(creatorId);
            if (contentData) {
                //@ts-ignore
                if (req.userId == creatorId) {
                    return ResponseUtil.sendResponse(res, 200, "Successfully get content", contentData);
                }
                //@ts-ignore
                const success = await this.subscriptionService.isUserSubscribedToCreator(req.userId, creatorId);
                // @ts-ignore
                if (!success || success == "false" || success == false) {
                    return ResponseUtil.sendError(res, 401, "Unauthorized - Subscription required", null);
                } else {
                    return ResponseUtil.sendResponse(res, 200, "Successfully get content", contentData);
                }
            } else {
                return ResponseUtil.sendError(res, 404, 'Content not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


}
