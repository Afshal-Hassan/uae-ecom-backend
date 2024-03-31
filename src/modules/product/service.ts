import { OkPacket } from "mysql2";
import { Product } from "./models";
import { redisClient } from "../../redis/redis";
import mySqlConnnection from "../../db/database";
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
            .then(async productKeys => {

                await Promise.all(productKeys.map(async productKey => {
                    const productId = productKey.split(":")[1];
                    const product = await getProductById(productId);
                    if (product) products.push(product);
                }));

                resolve(products);
            })
            .catch(error => reject(error));
    });
}

export const saveAllProductsToDB = (products: Product[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        const productValues = products.map(product => [product.id, product.title, product.description, product.imageUrl]);

        mySqlConnnection.query<OkPacket>(
            "INSERT INTO products (id, title, description, image_url) VALUES ? ON DUPLICATE KEY UPDATE id = VALUES(id)",
            [productValues],
            (err, res) => {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}