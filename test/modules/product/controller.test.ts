import express from 'express';
import request from 'supertest';
import { API_VERSION } from '../../../src/helpers/constants';
import { errorHandler } from '../../../src/helpers/middlewares';
import productController from '../../../src/modules/product/controller';

jest.mock('../../../src/modules/product/service', () => {
    const productMock = require("../../../src/mocks/responses/product");
    return {
        saveProduct: jest.fn(() => productMock.CREATE_PRODUCT_SUCCESS_RESPONSE),
        getProductById: jest.fn(() => productMock.GET_PRODUCT_BY_ID_RESPONSE),
        getAllProducts: jest.fn(() => productMock.GET_ALL_PRODUCT_ERROR_RESPONSE),
    }
});

let getByProductId: any;
let createProductRequestBody: any;
let createProductTitleErrorRequestBody: any;
let createProductImageUrlErrorRequestBody: any;
let createProductDescriptionErrorRequestBody: any;

beforeEach(() => {
    createProductRequestBody = {
        title: "Test",
        description: "Test desc",
        image_url: "http://example.com"
    }

    createProductTitleErrorRequestBody = {
        title: "",
        description: "Test desc",
        image_url: "http://example.com"
    }

    createProductDescriptionErrorRequestBody = {
        title: "Test",
        description: "",
        image_url: "http://example.com"
    }

    createProductImageUrlErrorRequestBody = {
        title: "Test",
        description: "Test desc",
        image_url: ""
    }

    getByProductId = "123"
})

describe('Product Controller Test Suite', () => {
    const app = express();
    app.use(express.json());
    app.use(API_VERSION, productController);
    app.use(errorHandler);

    it('should create a new product', async () => {
        // Act
        const response = await request(app)
            .post('/api/v1/product')
            .send(createProductRequestBody);

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/Product has been saved successfully/);
        expect(response.body.data.title).toEqual(createProductRequestBody.title);
        expect(response.body.data.description).toEqual(createProductRequestBody.description);
        expect(response.body.data.image_url).toEqual(createProductRequestBody.image_url);
    });

    it('should throw exception for title on create a new product', async () => {
        // Act
        const response = await request(app)
            .post('/api/v1/product')
            .send(createProductTitleErrorRequestBody);

        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/title is not allowed to be empty/);
    });

    it('should throw exception for description on create a new product', async () => {
        // Act
        const response = await request(app)
            .post('/api/v1/product')
            .send(createProductDescriptionErrorRequestBody);

        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/description is not allowed to be empty/);
    });

    it('should throw exception for image_url on create a new product', async () => {
        // Act
        const response = await request(app)
            .post('/api/v1/product')
            .send(createProductImageUrlErrorRequestBody);

        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/image url is not allowed to be empty/);
    });

    it('should throw exception on get a product by id', async () => {
        // Act
        const response = await request(app)
            .get('/api/v1/product/' + getByProductId);

        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Product not found by productId: " + getByProductId);
    });

    it('should throw exception on get all product', async () => {
        // Act
        const response = await request(app)
            .get('/api/v1/product/all');

        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/No Products exists/);
    });
});