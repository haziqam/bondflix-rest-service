import {Category, PrismaClient} from '@prisma/client';
import {CategoryRepository} from '../../../interfaces/repositories/category.repository';

const prisma = new PrismaClient();

export class CategoryRepositoryPrisma implements CategoryRepository {
    async create(category: Category) {
        await prisma.category.create({ data: category });
    }

    async delete(id: number) {
        await prisma.category.delete({ where: { id } });
    }

    async findByName(name: string) {
        return prisma.category.findFirst({ where: { name } });
    }

    async findById(id: number) {
        return prisma.category.findUnique({ where: { id } });
    }

    async update(category: Category) {
        await prisma.category.update({
            where: { id: category.id },
            data: category,
        });
    }
}
