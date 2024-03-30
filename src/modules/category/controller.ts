import { validateCategory } from "./validate";
import { BadRequest } from "../../helpers/exceptions";
import { getAllCategories, getCategoryById, saveCategory } from "./service";
import express, { Request, Response, NextFunction } from "express";
import { mapResponse as getCategoryMapResponse } from "./get-category/map-response";
import { mapRequest as createCategoryMapRequest } from "./create-category/map-request";
import { mapResponse as createCategoryMapResponse } from "./create-category/map-response";
import { mapResponse as getAllCategoryMapResponse } from "./get-all-category/map-response";

const categoryController = express.Router();

categoryController.post("/category", async (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body;
    const { error } = await validateCategory(requestBody);

    if (error) {
        return next(new BadRequest(error.details[0].message.replace(/[\\"]/g, '').replace(/_/g, " ")));
    }

    try {
        const newCategory = createCategoryMapRequest(requestBody);
        const category = await saveCategory(newCategory);
        const mappedResponse = createCategoryMapResponse(category);

        res.status(200).send(mappedResponse);
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }
});

categoryController.get("/category/all", async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getAllCategories();

    if (!categories || categories.length === 0) {
        return next(new BadRequest("No Categories exists"));
    }

    const mappedResponse = getAllCategoryMapResponse(categories);

    res.status(200).send(mappedResponse);
});

categoryController.get("/category/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId || "";
    const category = await getCategoryById(categoryId);

    if (!category) {
        return next(new BadRequest("Product not found by productId: " + categoryId));
    }

    const mappedResponse = getCategoryMapResponse(category);

    res.status(200).send(mappedResponse);
})

export default categoryController;