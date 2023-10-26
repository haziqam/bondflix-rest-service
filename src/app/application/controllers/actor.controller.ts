import {Request, Response} from 'express';
import {ActorService} from '../services/actor.service';
import {ResponseUtil} from '../../utils/response.utils';
import {CreateActorSchema} from "../../schema/actor/create_actor.schema";
import {UpdateActorSchema} from "../../schema/actor/update_actor.schema";
import {SearchActorByNameSchema} from "../../schema/actor/search_actor_by_name.schema";
import {handle_error} from "../../utils/handle_error.utils";

export class ActorController {
    private actorService: ActorService;

    constructor(actorService: ActorService) {
        this.actorService = actorService;
    }

    async createActor(req: Request, res: Response) {
        try {
            const { name } = CreateActorSchema.parse(req.body);

            const createdActor = await this.actorService.createActor(name);

            if (createdActor) {
                return ResponseUtil.sendResponse(res, 201, 'Actor created successfully', createdActor);
            } else {
                return ResponseUtil.sendError(res, 500, 'Actor creation failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


    async updateActor(req: Request, res: Response) {
        try {
            const actorId = parseInt(req.params.id, 10);
            const { ...updatedActor } = UpdateActorSchema.parse(req.body);
            //@ts-ignore
            const success = await this.actorService.updateActor(actorId, updatedActor);

            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Actor updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Actor not found or update failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteActor(req: Request, res: Response) {
        try {
            const actorId = parseInt(req.params.id, 10);
            const success = await this.actorService.deleteActor(actorId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Actor deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Actor not found or deletion failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getActorById(req: Request, res: Response) {
        try {
            const actorId = parseInt(req.params.id, 10);

            const actor = await this.actorService.findActorById(actorId);

            if (actor) {
                return ResponseUtil.sendResponse(res, 200, 'Actor retrieved successfully', actor);
            } else {
                return ResponseUtil.sendError(res, 404, 'Actor not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getActorByName(req: Request, res: Response) {
        try {
            const data = SearchActorByNameSchema.parse(req.query);
            const actor = await this.actorService.findActorByName(data.name);

            if (actor) {
                return ResponseUtil.sendResponse(res, 200, 'Actor retrieved successfully', actor);
            } else {
                return ResponseUtil.sendError(res, 404, 'Actor not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }



    async getAllActor(req: Request, res: Response) {
        try {
            const allActor = await this.actorService.getAllActors();

            if (allActor && allActor.length > 0) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allActor);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No actor found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

}
