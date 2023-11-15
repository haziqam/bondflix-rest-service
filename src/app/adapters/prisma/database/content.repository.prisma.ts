import {Content, PrismaClient} from '@prisma/client';
import {ContentRepository} from '../../../interfaces/repositories/content.repository';

const prisma = new PrismaClient();

export class ContentRepositoryPrisma implements ContentRepository {
    async create(content: Content): Promise<Content> {
        return prisma.content.create({data: content});
    }

    async delete(id: number) {
        await prisma.content.delete({ where: { id } });
    }

    async findByTitle(title: string) {
        return prisma.content.findFirst({ where: { title } });
    }

    async findById(id: number) {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }

        return prisma.content.findUnique({ where: { id: id } });
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

    async associateGenres(contentId: number, genres: number[]): Promise<void> {
        await prisma.content.update({
            where: { id: contentId },
            data: {
                genres: {
                    connect: genres.map(genreId => ({ id: genreId }))
                }
            }
        });
    }

    async associateCategories(contentId: number, categories: number[]): Promise<void> {
        await prisma.content.update({
            where: { id: contentId },
            data: {
                categories: {
                    connect: categories.map(categoryId => ({ id: categoryId }))
                }
            }
        });
    }

}
