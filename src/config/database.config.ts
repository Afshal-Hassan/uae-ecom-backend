interface MYSQLConfig {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
    charset?: string,
}

export default {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "uaeecomdb",
    charset: process.env.CHARSET || "utf8mb4"
} as MYSQLConfig;
