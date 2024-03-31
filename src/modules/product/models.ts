import { RowDataPacket } from "mysql2";

export interface Product extends RowDataPacket {
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    categoryId: string
}

export interface ProductDto {
    id: string,
    title: string,
    description: string,
    image_url: string
}