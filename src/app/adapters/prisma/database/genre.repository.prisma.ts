import {Genre, PrismaClient} from '@prisma/client';
import {GenreRepository} from '../../../interfaces/repositories/genre.repository';

const prisma = new PrismaClient();

export class GenreRepositoryPrisma implements GenreRepository {
    async create(genre: Genre) {
        await prisma.genre.create({ data: genre });
    }

    async delete(id: number) {
        await prisma.genre.delete({ where: { id } });
    }

    async findByName(name: string) {
        return prisma.genre.findFirst({ where: { name } });
    }

    async findById(id: number) {
        return prisma.genre.findUnique({ where: { id } });
    }

    async update(genre: Genre) {
        await prisma.genre.update({
            where: { id: genre.id },
            data: genre,
        });
    }

    async findAll() {
        return prisma.genre.findMany();
    }
}
