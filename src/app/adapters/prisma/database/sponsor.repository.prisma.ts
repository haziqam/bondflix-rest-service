import {PrismaClient, Sponsor} from '@prisma/client';
import {SponsorRepository} from '../../../interfaces/repositories/sponsor.repository';

const prisma = new PrismaClient();

export class SponsorRepositoryPrisma implements SponsorRepository {
    async create(sponsor: Sponsor) {
        await prisma.sponsor.create({ data: sponsor });
    }

    async update(sponsor: Sponsor) {
        await prisma.sponsor.update({
            where: { id: sponsor.id },
            data: sponsor,
        });
    }

    async delete(id: number) {
        await prisma.sponsor.delete({ where: { id } });
    }

    async findById(id: number) {
        return prisma.sponsor.findUnique({ where: { id } });
    }

    async findByName(name: string) {
        return prisma.sponsor.findFirst({ where: { name } });
    }

    async findAll() {
        return prisma.sponsor.findMany();
    }
}
