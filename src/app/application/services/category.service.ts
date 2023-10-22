import {Category} from '@prisma/client';
import {CategoryRepository} from "../../interfaces/repositories/category.repository";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(
        name: string
    ): Promise<Category | null> {
        //@ts-ignore
        const newCategory: Category = {
            name
        };

        await this.categoryRepository.create(newCategory);
        return newCategory;
    }

    async updateCategory(categoryId: number, updatedCategory: Partial<Category>): Promise<boolean> {
        const existingCategory = await this.categoryRepository.findById(categoryId);
        if (!existingCategory) {
            return false;
        }
        updatedCategory.id = categoryId;
        await this.categoryRepository.update(updatedCategory);
        return true;
    }

    async deleteCategory(categoryId: number): Promise<boolean> {
        const existingCategory = await this.categoryRepository.findById(categoryId);
        if (!existingCategory) {
            return false;
        }

        await this.categoryRepository.delete(categoryId);
        return true;
    }

    async findCategoryById(categoryId: number): Promise<Category | null> {
        return this.categoryRepository.findById(categoryId);
    }

    async findCategoryByName(name: string): Promise<Category | null> {
        return this.categoryRepository.findByName(name);
    }

    async getAllCategories(): Promise<Category[] | null> {
        return this.categoryRepository.findAll();
    }

}
