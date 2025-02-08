import { Client } from "pg";
import dotenv from "dotenv";

// const pgClient = new Client("postgresql://neondb_owner:npg_cFiB1pYO4QDr@ep-gentle-mode-a8665p8d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")

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