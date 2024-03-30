import { RowDataPacket } from "mysql2";

export interface Category extends RowDataPacket {
    id: string,
    name: string,
}

export interface CategoryDto {
    id: string,
    name: string,
}