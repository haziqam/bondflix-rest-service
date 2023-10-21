import { PrismaClient, Director } from '@prisma/client';
import { DirectorRepository } from '../../../interfaces/repositories/director.repository';

const prisma = new PrismaClient();

export class DirectorRepositoryPrisma implements DirectorRepository {
    async create(director: Director) {
        await prisma.director.create({ data: director });
    }

    async delete(id: number) {
        await prisma.director.delete({ where: { id } });
    }

    async findByName(name: string) {
        return prisma.director.findFirst({ where: { name } });
    }

    async findById(id: number) {
        return prisma.director.findUnique({ where: { id } });
    }

    async update(director: Director) {
        await prisma.director.update({
            where: { id: director.id },
            data: director,
        });
    }
}
