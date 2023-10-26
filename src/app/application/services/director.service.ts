import {Director} from '@prisma/client';
import {DirectorRepository} from "../../interfaces/repositories/director.repository";

/**
 * What to do in Services:
 * 1. Implement Business Logic
 * 2. Handle Database Operations
 * 3. Enforce Business Rules
 * 4. Don't Access HTTP Request/Response
 * 5. Validate / Sanitize Input using Zod
 */
export class DirectorService {
    private directorRepository: DirectorRepository;

    constructor(directorRepository: DirectorRepository) {
        this.directorRepository = directorRepository;
    }

    async createDirector(directorName: string): Promise<boolean> {
        //@ts-ignore
        const newDirector : Director = {
            name: directorName
        }

        await this.directorRepository.create(newDirector);
        return true;
    }

    async deleteDirector(id: number): Promise<boolean | null> {
         const existingDirector = await this.directorRepository.findById(id);
         if (!existingDirector) {
             return false;
         }

         await this.directorRepository.delete(id);
         return true;
    }

    async updateDirector(id: number, updatedDirector: Partial<Director>): Promise<boolean> {
        const existingDirector = await this.directorRepository.findById(id);
        if (!existingDirector) {
            return false;
        }

        updatedDirector.id = id;
        await this.directorRepository.update(updatedDirector);
        return true;
    }

    async findDirectorByName(directorName: string): Promise<Director | null>{
        const existingDirector = await this.directorRepository.findByName(directorName);
        if (!existingDirector) {
            return null;
        }

        return existingDirector;
    }

    async findDirectorById(id: number): Promise<Director | null> {
        const existingDirector = await this.directorRepository.findById(id);
        if (!existingDirector) {
            return null;
        }
        return existingDirector;
    }

    async getAllDirectors(): Promise<Director[] | null> {
        return this.directorRepository.findAll();
    }
}
