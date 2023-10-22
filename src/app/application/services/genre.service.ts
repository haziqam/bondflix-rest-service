import {Genre} from '@prisma/client';
import {GenreRepository} from "../../interfaces/repositories/genre.repository";

export class GenreService {
    private genreRepository: GenreRepository;

    constructor(genreRepository: GenreRepository) {
        this.genreRepository = genreRepository;
    }

    async createGenre(
        name: string
    ): Promise<Genre | null> {
        //@ts-ignore
        const newGenre: Genre = {
            name
        };

        await this.genreRepository.create(newGenre);
        return newGenre;
    }

    async updateGenre(genreId: number, updatedGenre: Partial<Genre>): Promise<boolean> {
        const existingGenre = await this.genreRepository.findById(genreId);
        if (!existingGenre) {
            return false;
        }
        updatedGenre.id = genreId;
        await this.genreRepository.update(updatedGenre);
        return true;
    }

    async deleteGenre(genreId: number): Promise<boolean> {
        const existingGenre = await this.genreRepository.findById(genreId);
        if (!existingGenre) {
            return false;
        }

        await this.genreRepository.delete(genreId);
        return true;
    }

    async findGenreById(genreId: number): Promise<Genre | null> {
        return this.genreRepository.findById(genreId);
    }

    async findGenreByName(name: string): Promise<Genre | null> {
        return this.genreRepository.findByName(name);
    }

    async getAllGenres(): Promise<Genre[] | null> {
        return this.genreRepository.findAll();
    }

}
