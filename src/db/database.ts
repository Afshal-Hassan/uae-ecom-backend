import mysql from "mysql2";
import databaseConfig from "../config/database.config";

const mySqlConnnection = mysql.createConnection({
    host: databaseConfig.host,
    user: databaseConfig.user,
    database: databaseConfig.database,
    password: databaseConfig.password
});

mySqlConnnection.connect(error => {
    if (error) {
        console.log(`Database connection ${error}`);
    } else {
        console.log("MySQL Database connected");
    }
})

export default mySqlConnnection;

