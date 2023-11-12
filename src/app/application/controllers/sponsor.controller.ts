import {Request, Response} from 'express';
import {SponsorService} from '../services/sponsor.service';
import {ResponseUtil} from '../../utils/response.utils';
import {CreateSponsorSchema} from "../../schema/sponsor/create_sponsor.schema";
import {UpdateSponsorSchema} from "../../schema/sponsor/update_sponsor.schema";
import {SearchSponsorByNameSchema} from "../../schema/sponsor/search_sponsor_by_name.schema";
import {handle_error} from "../../utils/handle_error.utils";

export class SponsorController {
    private sponsorService: SponsorService;

    constructor(sponsorService: SponsorService) {
        this.sponsorService = sponsorService;
    }

    async createSponsor(req: Request, res: Response) {
        try {
            const { name } = CreateSponsorSchema.parse(req.body);

            const createdSponsor = await this.sponsorService.createSponsor(name);

            if (createdSponsor) {
                return ResponseUtil.sendResponse(res, 201, 'Sponsor created successfully', createdSponsor);
            } else {
                return ResponseUtil.sendError(res, 500, 'Sponsor creation failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


    async updateSponsor(req: Request, res: Response) {
        try {
            const sponsorId = parseInt(req.params.id, 10);
            const { ...updatedSponsor } = UpdateSponsorSchema.parse(req.body);
            //@ts-ignore
            const success = await this.sponsorService.updateSponsor(sponsorId, updatedSponsor);

            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Sponsor updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Sponsor not found or update failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteSponsor(req: Request, res: Response) {
        try {
            const sponsorId = parseInt(req.params.id, 10);
            const success = await this.sponsorService.deleteSponsor(sponsorId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Sponsor deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Sponsor not found or deletion failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getSponsorById(req: Request, res: Response) {
        try {
            const sponsorId = parseInt(req.params.id, 10);

            const sponsor = await this.sponsorService.findSponsorById(sponsorId);

            if (sponsor) {
                return ResponseUtil.sendResponse(res, 200, 'Sponsor retrieved successfully', sponsor);
            } else {
                return ResponseUtil.sendError(res, 404, 'Sponsor not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getSponsorByName(req: Request, res: Response) {
        try {
            const data = SearchSponsorByNameSchema.parse(req.query);
            const sponsor = await this.sponsorService.findSponsorByName(data.name);

            if (sponsor) {
                return ResponseUtil.sendResponse(res, 200, 'Sponsor retrieved successfully', sponsor);
            } else {
                return ResponseUtil.sendError(res, 404, 'Sponsor not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }



    async getAllSponsor(req: Request, res: Response) {
        try {
            const allSponsor = await this.sponsorService.getAllSponsors();

            if (allSponsor && allSponsor.length > 0) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allSponsor);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No sponsor found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

}
