import { Product } from "./models";
import { redisClient } from "../../redis/redis";
import { PRODUCT_REDIS_KEY } from "../../helpers/constants";

export const saveProduct = async (product: Product): Promise<Product> => {
    return new Promise((resolve, reject) => {
        redisClient.set(PRODUCT_REDIS_KEY + product.id, JSON.stringify(product))
            .then(() => resolve(product))
            .catch(error => reject(error));
    });
}

export const getProductById = (productId: string): Promise<Product> => {
    return new Promise((resolve, reject) => {
        redisClient.get(PRODUCT_REDIS_KEY + productId)
            .then(response => {
                const product: Product | null = response ? JSON.parse(response) : null;
                resolve(product);
            })
            .catch(error => reject(error));
    });
}

export const getAllProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        const products: Product[] = [];

        redisClient.keys(PRODUCT_REDIS_KEY + "*")
            .then(productKeys => {
                productKeys.forEach(async productKey => {
                    const productId = productKey.split(":")[1];
                    const product = await getProductById(productId);
                    if (product) {
                        products.push(product);
                    }
                })
            })
            .catch(error => reject(error));

        resolve(products);
    });
}