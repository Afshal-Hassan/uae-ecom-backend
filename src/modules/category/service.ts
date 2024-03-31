import { Category } from "./models";
import { redisClient } from "../../redis/redis";
import { BadRequest } from "../../helpers/exceptions";
import { CATEGORY_REDIS_KEY } from "../../helpers/constants";

export const saveCategory = async (category: Category): Promise<Category> => {
    return new Promise(async (resolve, reject) => {
        const categories = await getAllCategories();
        const isCategoryExist = categories.find(c => c.name === category.name);

        if (isCategoryExist) reject("Category must be unique, provided category name: " + category.name);

        redisClient.set(CATEGORY_REDIS_KEY + category.id, JSON.stringify(category))
            .then(() => resolve(category))
            .catch(error => reject(error));
    });
}

export const getCategoryById = (categoryId: string): Promise<Category> => {
    return new Promise((resolve, reject) => {
        redisClient.get(CATEGORY_REDIS_KEY + categoryId)
            .then(response => {
                const category: Category | null = response ? JSON.parse(response) : null;
                resolve(category);
            })
            .catch(error => reject(error));
    });
}

export const getAllCategories = (): Promise<Category[]> => {
    return new Promise((resolve, reject) => {
        const categories: Category[] = [];

        redisClient.keys(CATEGORY_REDIS_KEY + "*")
            .then(async categoryKeys => {

                await Promise.all(categoryKeys.map(async categoryKey => {
                    const categoryId = categoryKey.split(":")[1];
                    const category = await getCategoryById(categoryId);
                    if (category) categories.push(category);
                }));

                resolve(categories);
            })
            .catch(error => reject(error));
    });
}