import { Client } from "pg";
import dotenv from "dotenv";


dotenv.config();


const pgClient = new Client({
    user: process.env.user,
    password: process.env.password,
    port: 5432,
    host: process.env.host,
    database: process.env.database,
    ssl: true
});

async function main() {
    await pgClient.connect();
    console.log("connected");
}
main();