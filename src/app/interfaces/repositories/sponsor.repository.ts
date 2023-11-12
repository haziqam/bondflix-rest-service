import {Sponsor} from '@prisma/client';

export interface SponsorRepository {
    create(actor: Sponsor): Promise<void>;
    update(actor: Partial<Sponsor>): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Sponsor | null>;
    findByName(name: string): Promise<Sponsor | null>;
    findAll(): Promise<Sponsor[] | null>;
}
