import { Category } from "./models";
import { validateCategory } from "./validate";
import { BadRequest } from "../../helpers/exceptions";
import express, { Request, Response, NextFunction } from "express";
import { getAllCategories, getCategoryById, saveCategory } from "./service";
import { mapResponse as getCategoryMapResponse } from "./get-category/map-response";
import { mapRequest as createCategoryMapRequest } from "./create-category/map-request";
import { mapResponse as createCategoryMapResponse } from "./create-category/map-response";
import { mapResponse as getAllCategoryMapResponse } from "./get-all-category/map-response";

const categoryController = express.Router();

categoryController.post("/category", async (req: Request, res: Response, next: NextFunction) => {
    let category: Category;
    const requestBody = req.body;
    const { error } = await validateCategory(requestBody);

    if (error) {
        return next(new BadRequest(error.details[0].message.replace(/[\\"]/g, '').replace(/_/g, " ")));
    }

    const newCategory = createCategoryMapRequest(requestBody);

    try {
        category = await saveCategory(newCategory);
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }

    const mappedResponse = createCategoryMapResponse(category);

    res.status(200).send(mappedResponse);
});

categoryController.get("/category/all", async (req: Request, res: Response, next: NextFunction) => {
    let categories: Category[];

    try {
        categories = await getAllCategories();
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }

    if (!categories || categories.length === 0) {
        return next(new BadRequest("No Categories exists"));
    }

    const mappedResponse = getAllCategoryMapResponse(categories);

    res.status(200).send(mappedResponse);
});

categoryController.get("/category/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
    let category: Category;
    const categoryId = req.params.categoryId || "";

    try {
        category = await getCategoryById(categoryId);
    }
    catch (error) {
        return next(new BadRequest(error?.message || error));
    }

    if (!category) {
        return next(new BadRequest("Category not found by categoryId: " + categoryId));
    }

    const mappedResponse = getCategoryMapResponse(category);

    res.status(200).send(mappedResponse);
})

export default categoryController;