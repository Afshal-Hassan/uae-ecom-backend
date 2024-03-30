import { Product } from "../models"
import { v4 as uuidv4 } from 'uuid';

export const mapRequest = (requestBody: any): Product => {
    return {
        id: uuidv4(),
        title: requestBody.title,
        description: requestBody.description,
        imageUrl: requestBody.image_url
    } as Product;
}