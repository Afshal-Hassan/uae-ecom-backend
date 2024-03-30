import { GenericResponse } from "../../../helpers/internal-model";
import { Category, CategoryDto } from "../models";

export const mapResponse = (category: Category): GenericResponse<CategoryDto> => {
    const categoryDto = getCategoryDto(category);
    return new GenericResponse<CategoryDto>("Category has been saved successfully", categoryDto);
}

const getCategoryDto = (category: Category): CategoryDto => {
    return {
        id: category.id,
        name: category.name
    }
}