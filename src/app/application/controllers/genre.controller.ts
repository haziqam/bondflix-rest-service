import {Request, Response} from 'express';
import {GenreService} from '../services/genre.service';
import {ResponseUtil} from '../../utils/response.utils';
import {CreateGenreSchema} from "../../schema/genre/create_genre.schema";
import {UpdateGenreSchema} from "../../schema/genre/update_genre.schema";
import {SearchGenreByNameSchema} from "../../schema/genre/search_genre_by_name.schema";
import {handle_error} from "../../utils/handle_error.utils";
import {RedisClient} from "../../adapters/redis/redis.client";

export class GenreController {
    private genreService: GenreService;

    constructor(genreService: GenreService) {
        this.genreService = genreService;
    }

    async createGenre(req: Request, res: Response) {
        try {
            const { name } = CreateGenreSchema.parse(req.body);

            const createdGenre = await this.genreService.createGenre(name
            );

            if (createdGenre) {
                return ResponseUtil.sendResponse(res, 201, 'Genre created successfully', createdGenre);
            } else {
                return ResponseUtil.sendError(res, 500, 'Genre creation failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


    async updateGenre(req: Request, res: Response) {
        try {
            const genreId = parseInt(req.params.id, 10);
            const { ...updatedGenre } = UpdateGenreSchema.parse(req.body);
            //@ts-ignore
            const success = await this.genreService.updateGenre(genreId, updatedGenre);

            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Genre updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Genre not found or update failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteGenre(req: Request, res: Response) {
        try {
            const genreId = parseInt(req.params.id, 10);
            const success = await this.genreService.deleteGenre(genreId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Genre deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Genre not found or deletion failed', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getGenreById(req: Request, res: Response) {
        try {
            const genreId = parseInt(req.params.id, 10);

            const genre = await this.genreService.findGenreById(genreId);

            if (genre) {
                return ResponseUtil.sendResponse(res, 200, 'Genre retrieved successfully', genre);
            } else {
                return ResponseUtil.sendError(res, 404, 'Genre not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }

    async getGenreByName(req: Request, res: Response) {
        try {
            const data = SearchGenreByNameSchema.parse(req.params.name);
            const genre = await this.genreService.findGenreByName(data.name);

            if (genre) {
                return ResponseUtil.sendResponse(res, 200, 'Genre retrieved successfully', genre);
            } else {
                return ResponseUtil.sendError(res, 404, 'Genre not found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }



    async getAllGenre(req: Request, res: Response) {
        try {
            const redisClient = RedisClient.getInstance();
            let allGenreString = await redisClient.get("allGenre");

            let allGenre;
            if (allGenreString == null) {
                allGenre = await this.genreService.getAllGenres();

                if (allGenre && allGenre.length > 0) {
                    allGenreString = JSON.stringify(allGenre);
                    await redisClient.set("allGenre", allGenreString, 300);
                }
            } else {
                allGenre = JSON.parse(allGenreString);
            }

            if (allGenre && allGenre.length > 0) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allGenre);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No genre found', null);
            }
        } catch (error) {
            handle_error(res, error);
        }
    }


}
