import { v4 as uuidv4 } from 'uuid';
import { Category } from '../models';

export const mapRequest = (requestBody: any): Category => {
    return {
        id: uuidv4(),
        name: requestBody.name
    } as Category;
}