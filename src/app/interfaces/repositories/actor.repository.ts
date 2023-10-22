import {Actor} from '@prisma/client';

export interface ActorRepository {
    create(actor: Actor): Promise<void>;
    update(actor: Actor): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Actor | null>;
    findByName(name: string): Promise<Actor | null>;
}
