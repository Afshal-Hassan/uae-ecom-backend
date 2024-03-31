import { Category, CategoryDto } from "../models";
import { GenericResponse } from "../../../helpers/internal-model";

export const mapResponse = (categories: Category[]): GenericResponse<CategoryDto[]> => {
    const categoryDtos = getCategoryDtos(categories);
    return new GenericResponse<CategoryDto[]>("List of all categories", categoryDtos);
}

const getCategoryDtos = (categories: Category[]): CategoryDto[] => {
    return categories.map(category => {
        return {
            id: category.id,
            name: category.name
        };
    })
}