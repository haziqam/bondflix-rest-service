import {Request, Response} from 'express';
import {DirectorService} from '../services/director.service';
import {ResponseUtil} from '../../utils/response.utils';
import {CreateDirectorSchema} from "../../schema/director/create_director.schema";
import {UpdateDirectorSchema} from "../../schema/director/update_director.schema";
import {SearchDirectorByNameSchema} from "../../schema/director/search_director_by_name.schema";
import {handle_error} from "../../utils/handle_error.utils";

export class DirectorController {
    private directorService: DirectorService;

    constructor(directorService: DirectorService) {
        this.directorService = directorService;
    }

    async createDirector(req: Request, res: Response) {
        try {
            const { name } = CreateDirectorSchema.parse(req.body);

            const createdDirector = await this.directorService.createDirector(name);

            if (createdDirector) {
                return ResponseUtil.sendResponse(res, 201, 'Director created successfully', createdDirector);
            } else {
                return ResponseUtil.sendError(res, 500, 'Director creation failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


    async updateDirector(req: Request, res: Response) {
        try {
            const directorId = parseInt(req.params.id, 10);
            const { ...updatedDirector } = UpdateDirectorSchema.parse(req.body);
            //@ts-ignore
            const success = await this.directorService.updateDirector(directorId, updatedDirector);

            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Director updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Director not found or update failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteDirector(req: Request, res: Response) {
        try {
            const directorId = parseInt(req.params.id, 10);
            const success = await this.directorService.deleteDirector(directorId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Director deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Director not found or deletion failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getDirectorById(req: Request, res: Response) {
        try {
            const directorId = parseInt(req.params.id, 10);

            const director = await this.directorService.findDirectorById(directorId);

            if (director) {
                return ResponseUtil.sendResponse(res, 200, 'Director retrieved successfully', director);
            } else {
                return ResponseUtil.sendError(res, 404, 'Director not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getDirectorByName(req: Request, res: Response) {
        try {
            const data = SearchDirectorByNameSchema.parse(req.query);
            const director = await this.directorService.findDirectorByName(data.name);

            if (director) {
                return ResponseUtil.sendResponse(res, 200, 'Director retrieved successfully', director);
            } else {
                return ResponseUtil.sendError(res, 404, 'Director not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }



    async getAllDirector(req: Request, res: Response) {
        try {
            const allDirector = await this.directorService.getAllDirectors();

            if (allDirector && allDirector.length > 0) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allDirector);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No director found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

}
