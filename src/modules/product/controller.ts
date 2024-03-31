import { Product } from "./models";
import { validateProduct } from "./validate";
import { BadRequest } from "../../helpers/exceptions";
import { LogTypes, Methods } from "../../helpers/constants";
import express, { Request, Response, NextFunction } from "express";
import { logRequest, logResponse } from "../../helpers/winston-logger";
import { saveProduct, getProductById, getAllProducts } from "./service";
import { mapResponse as getProductMapResponse } from "./get-product/map-response";
import { mapRequest as createProductMapRequest } from "./create-product/map-request";
import { mapResponse as createProductMapResponse } from "./create-product/map-response";
import { mapResponse as getAllProductMapResponse } from "./get-all-product/map-response";

const productController = express.Router();

productController.post("/product", async (req: Request, res: Response, next: NextFunction) => {
    let product: Product;
    const requestBody = req.body;

    logRequest(Methods.POST, "/product", requestBody);

    const { error } = await validateProduct(requestBody);

    if (error) {
        return next(new BadRequest(error.details[0].message.replace(/[\\"]/g, '').replace(/_/g, " ")));
    }

    const newProduct = createProductMapRequest(requestBody);

    try {
        product = await saveProduct(newProduct);
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }

    const mappedResponse = createProductMapResponse(product);
    logResponse(mappedResponse);

    res.status(200).send(mappedResponse);
});

productController.get("/product/all", async (req: Request, res: Response, next: NextFunction) => {
    logRequest(Methods.GET, "/product/all");

    let products: Product[];

    try {
        products = await getAllProducts();
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }

    if (!products || products.length === 0) {
        return next(new BadRequest("No Products exists"));
    }

    const mappedResponse = getAllProductMapResponse(products);
    logResponse(mappedResponse);

    res.status(200).send(mappedResponse);
});

productController.get("/product/:productId", async (req: Request, res: Response, next: NextFunction) => {
    logRequest(Methods.GET, "/product/all");

    let product: Product;
    const productId = req.params.productId || "";

    try {
        product = await getProductById(productId);
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }

    if (!product) {
        return next(new BadRequest("Product not found by productId: " + productId));
    }

    const mappedResponse = getProductMapResponse(product);
    logResponse(mappedResponse);

    res.status(200).send(mappedResponse);
})

export default productController;