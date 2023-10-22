import {Request, Response} from 'express';
import {CategoryService} from '../services/category.service';
import {ResponseUtil} from '../../utils/response.utils';
import {CreateCategorySchema} from "../../schema/category/create_category.schema";
import {UpdateCategorySchema} from "../../schema/category/update_category.schema";
import {SearchCategoryByNameSchema} from "../../schema/category/search_category_by_name.schema";

export class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    async createCategory(req: Request, res: Response) {
        try {
            const { name } = CreateCategorySchema.parse(req.body);

            const createdCategory = await this.categoryService.createCategory(name
            );

            if (createdCategory) {
                return ResponseUtil.sendResponse(res, 201, 'Category created successfully', createdCategory);
            } else {
                return ResponseUtil.sendError(res, 500, 'Category creation failed', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }


    async updateCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.id, 10);
            const { ...updatedCategory } = UpdateCategorySchema.parse(req.body);
            //@ts-ignore
            const success = await this.categoryService.updateCategory(categoryId, updatedCategory);

            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Category updated successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Category not found or update failed', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.id, 10);
            const success = await this.categoryService.deleteCategory(categoryId);
            if (success) {
                return ResponseUtil.sendResponse(res, 200, 'Category deleted successfully', null);
            } else {
                return ResponseUtil.sendError(res, 404, 'Category not found or deletion failed', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.id, 10);

            const category = await this.categoryService.findCategoryById(categoryId);

            if (category) {
                return ResponseUtil.sendResponse(res, 200, 'Category retrieved successfully', category);
            } else {
                return ResponseUtil.sendError(res, 404, 'Category not found', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

    async getCategoryByName(req: Request, res: Response) {
        try {
            const data = SearchCategoryByNameSchema.parse(req.params.name);
            const category = await this.categoryService.findCategoryByName(data.name);

            if (category) {
                return ResponseUtil.sendResponse(res, 200, 'Category retrieved successfully', category);
            } else {
                return ResponseUtil.sendError(res, 404, 'Category not found', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }



    async getAllCategory(req: Request, res: Response) {
        try {
            const allCategory = await this.categoryService.getAllCategories();

            if (allCategory && allCategory.length > 0) {
                return ResponseUtil.sendResponse(res, 200, 'Success', allCategory);
            } else {
                return ResponseUtil.sendResponse(res, 404, 'No category found', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Unable to process data', error);
        }
    }

}
