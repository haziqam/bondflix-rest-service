import {Content, PrismaClient} from '@prisma/client';
import {ContentRepository} from '../../../interfaces/repositories/content.repository';

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

    async update(content: Partial<Content>) {
        const contentId = content.id;

        if (contentId === undefined) {
            throw new Error('Content ID is required for update.');
        }

        await prisma.content.update({
            where: { id: contentId },
            data: content,
        });
    }

    async findAll() {
        return prisma.content.findMany({
            include: {
                user: true,
                genres: true,
                categories: true,
            }
        });
    }
}
