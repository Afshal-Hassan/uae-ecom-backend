import { validateProduct } from "./validate";
import { BadRequest } from "../../helpers/exceptions";
import express, { Request, Response, NextFunction } from "express";
import { saveProduct, getProductById, getAllProducts } from "./service";
import { mapResponse as getProductMapResponse } from "./get-product/map-response";
import { mapRequest as createProductMapRequest } from "./create-product/map-request";
import { mapResponse as createProductMapResponse } from "./create-product/map-response";
import { mapResponse as getAllProductMapResponse } from "./get-all-product/map-response";

const productController = express.Router();

productController.post("/product", async (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body;
    const { error } = await validateProduct(requestBody);

    if (error) {
        return next(new BadRequest(error.details[0].message.replace(/[\\"]/g, '').replace(/_/g, " ")));
    }

    const newProduct = createProductMapRequest(requestBody);
    const product = await saveProduct(newProduct);
    const mappedResponse = createProductMapResponse(product);

    res.status(200).send(mappedResponse);
});

productController.get("/product/all", async (req: Request, res: Response, next: NextFunction) => {
    const products = await getAllProducts();

    if (!products || products.length === 0) {
        return next(new BadRequest("No Products exists"));
    }

    const mappedResponse = getAllProductMapResponse(products);

    res.status(200).send(mappedResponse);
});

productController.get("/product/:productId", async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId || "";
    const product = await getProductById(productId);

    if (!product) {
        return next(new BadRequest("Product not found by productId: " + productId));
    }

    const mappedResponse = getProductMapResponse(product);

    res.status(200).send(mappedResponse);
})

export default productController;