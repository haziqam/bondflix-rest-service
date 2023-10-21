import { PrismaClient, Content } from '@prisma/client';
import { ContentRepository } from '../../../interfaces/repositories/content.repository';

const prisma = new PrismaClient();

export class ContentRepositoryPrisma implements ContentRepository {
    async create(content: Content) {
        await prisma.content.create({ data: content });
    }

    async delete(id: number) {
        await prisma.content.delete({ where: { id } });
    }

    async findByTitle(title: string) {
        return prisma.content.findFirst({ where: { title } });
    }

    async findById(id: number) {
        return prisma.content.findUnique({ where: { id } });
    }

    async update(content: Content) {
        await prisma.content.update({
            where: { id: content.id },
            data: content,
        });
    }
}
