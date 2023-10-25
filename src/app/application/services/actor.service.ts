import {Actor} from '@prisma/client';
import {ActorRepository} from "../../interfaces/repositories/actor.repository";

/**
 * What to do in Services:
 * 1. Implement Business Logic
 * 2. Handle Database Operations
 * 3. Enforce Business Rules
 * 4. Don't Access HTTP Request/Response
 * 5. Validate / Sanitize Input using Zod
 */
export class ActorService {
    private actorRepository: ActorRepository;

    constructor(actorRepository: ActorRepository) {
        this.actorRepository = actorRepository;
    }

    async createActor(actorName: string): Promise<boolean> {
        //@ts-ignore
        const newActor : Actor = {
            name: actorName
        }

        await this.actorRepository.create(newActor);
        return true;
    }

    async deleteActor(id: number): Promise<boolean | null> {
         const existingActor = await this.actorRepository.findById(id);
         if (!existingActor) {
             return false;
         }

         await this.actorRepository.delete(id);
         return true;
    }

    async updateActor(id: number, updatedActor: Partial<Actor>): Promise<boolean> {
        const existingActor = await this.actorRepository.findById(id);
        if (!existingActor) {
            return false;
        }

        updatedActor.id = id;
        await this.actorRepository.update(updatedActor);
        return true;
    }

    async findActorByName(actorName: string): Promise<Actor | null>{
        const existingActor = await this.actorRepository.findByName(actorName);
        if (!existingActor) {
            return null;
        }

        return existingActor;
    }

    async findActorById(id: number): Promise<Actor | null> {
        const existingActor = await this.actorRepository.findById(id);
        if (!existingActor) {
            return null;
        }
        return existingActor;
    }

    async getAllActors(): Promise<Actor[] | null> {
        return this.actorRepository.findAll();
    }
}
