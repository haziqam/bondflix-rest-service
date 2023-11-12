import {Sponsor, SponsorStatus} from '@prisma/client';
import {SponsorRepository} from "../../interfaces/repositories/sponsor.repository";

/**
 * What to do in Services:
 * 1. Implement Business Logic
 * 2. Handle Database Operations
 * 3. Enforce Business Rules
 * 4. Don't Access HTTP Request/Response
 * 5. Validate / Sanitize Input using Zod
 */
export class SponsorService {
    private sponsorRepository: SponsorRepository;

    constructor(sponsorRepository: SponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    async createSponsor(sponsorName: string, sponsorStatus: SponsorStatus, link: string): Promise<boolean> {
        //@ts-ignore
        const newSponsor : Sponsor = {
            name: sponsorName,
            sponsor_status: sponsorStatus,
            link: link,
        }

        await this.sponsorRepository.create(newSponsor);
        return true;
    }

    async deleteSponsor(id: number): Promise<boolean | null> {
         const existingSponsor = await this.sponsorRepository.findById(id);
         if (!existingSponsor) {
             return false;
         }

         await this.sponsorRepository.delete(id);
         return true;
    }

    async updateSponsor(id: number, updatedSponsor: Partial<Sponsor>): Promise<boolean> {
        const existingSponsor = await this.sponsorRepository.findById(id);
        if (!existingSponsor) {
            return false;
        }

        updatedSponsor.id = id;
        await this.sponsorRepository.update(updatedSponsor);
        return true;
    }

    async findSponsorByName(sponsorName: string): Promise<Sponsor | null>{
        const existingSponsor = await this.sponsorRepository.findByName(sponsorName);
        if (!existingSponsor) {
            return null;
        }

        return existingSponsor;
    }

    async findSponsorById(id: number): Promise<Sponsor | null> {
        const existingSponsor = await this.sponsorRepository.findById(id);
        if (!existingSponsor) {
            return null;
        }
        return existingSponsor;
    }

    async getAllSponsors(): Promise<Sponsor[] | null> {
        return this.sponsorRepository.findAll();
    }
}
