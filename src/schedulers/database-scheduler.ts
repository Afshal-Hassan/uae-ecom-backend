import { isMainThread, threadId } from "worker_threads";
import cron from "node-cron";
import { getAllCategories, saveAllCategoriesToDB } from "../modules/category/service";
import { getAllProducts, saveAllProductsToDB } from "../modules/product/service";

interface TableInfo {
    getAllFromRedis: () => Promise<any>; // Function should return data from Redis
    saveToMySQL: (data: any) => Promise<any>; // Function should save data into MySQL
}

if (!isMainThread) {
    console.log(`Worker Thread Id: ${threadId}`)
}

const tableInfo: { [key: string]: TableInfo } = {
    category: {
        getAllFromRedis: getAllCategories,
        saveToMySQL: saveAllCategoriesToDB
    },
    product: {
        getAllFromRedis: getAllProducts,
        saveToMySQL: saveAllProductsToDB
    }
};

if (!isMainThread) {
    const databaseScheduler = cron.schedule('* * * * *', async () => {
        console.log(`\n********************************   Database Scheduler Started at: ${new Date().toLocaleString()}  ******************************`);
        console.log(`Worker Thread ID: ${threadId}`)

        try {
            const workerPromises = Object.values(tableInfo).map(info => {
                return new Promise<void>((resolve, reject) => {
                    const { getAllFromRedis, saveToMySQL } = info;
                    getAllFromRedis()
                        .then(data => saveToMySQL(data))
                        .then(() => resolve())
                        .catch(reject);
                });
            });

            await Promise.all(workerPromises);

            console.log(`\n********************************   Database Scheduler Ended at: ${new Date().toLocaleString()}  ******************************`);
        }
        catch (error) {
            console.error("Error occurred while saving data into MySQL:", error);
        }
    });

    databaseScheduler.start();
}