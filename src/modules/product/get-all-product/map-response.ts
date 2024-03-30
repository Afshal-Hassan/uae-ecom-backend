import { Product, ProductDto } from "../models";
import { GenericResponse } from "../../../helpers/internal-model";

export const mapResponse = (products: Product[]): GenericResponse<ProductDto[]> => {
    const productDtos = getProductDtos(products);
    return new GenericResponse<ProductDto[]>("List of all products", productDtos);
}

const getProductDtos = (products: Product[]): ProductDto[] => {
    return products.map(product => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            image_url: product.imageUrl
        };
    })
}