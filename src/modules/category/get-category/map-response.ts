import { Category, CategoryDto } from "../models";
import { GenericResponse } from "../../../helpers/internal-model";

export const mapResponse = (category: Category): GenericResponse<CategoryDto> => {
    const categoryDto = getCategoryDto(category);
    return new GenericResponse<CategoryDto>("List of category by categoryId: " + category.id, categoryDto);
}

const getCategoryDto = (category: Category): CategoryDto => {
    return {
        id: category.id,
        name: category.name
    }
}