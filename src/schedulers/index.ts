import path from "path";
import { Worker } from "worker_threads";

const databaseScheduler = new Worker(path.resolve(__dirname, "database-scheduler.js"));

databaseScheduler.on("message", message => {
    console.log(message);
});

databaseScheduler.on("error", error => {
    console.error("Error in database scheduler worker:", error);
});

databaseScheduler.on("exit", code => {
    if (code !== 0) {
        console.error("Database scheduler worker stopped with exit code", code);
    }
});

export default databaseScheduler;
