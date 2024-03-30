import { Product, ProductDto } from "../models";
import { GenericResponse } from "../../../helpers/internal-model";

export const mapResponse = (product: Product): GenericResponse<ProductDto> => {
    const productDto = getProductDto(product);
    return new GenericResponse<ProductDto>("Product has been saved successfully", productDto);
}

const getProductDto = (product: Product): ProductDto => {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        image_url: product.imageUrl
    }
}