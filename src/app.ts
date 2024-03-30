import cors from "cors";
import bodyParser from 'body-parser';
import { API_VERSION } from "./helpers/constants";
import { errorHandler } from "./helpers/middlewares";
import express, { Request, Response } from "express";
import productController from "./modules/product/controller";

const app = express();
require("./db/database");
require("./redis/redis");

//***************************   App uses    *************************

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000' // allow requests from this domain
}));

//***************************   Disables    *************************

app.disable("x-powered-by");

//************************************************************** */

// Routes

app.use(API_VERSION, productController);

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("App Running");
});

const port: number = parseInt(process.env.PORT) || 3005;

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

app.use(errorHandler)