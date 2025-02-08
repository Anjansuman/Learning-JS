"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// const pgClient = new Client("postgresql://neondb_owner:npg_cFiB1pYO4QDr@ep-gentle-mode-a8665p8d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")
dotenv_1.default.config();
console.log(process.env.password);
const pgClient = new pg_1.Client({
    user: process.env.user,
    password: process.env.password,
    port: 5432,
    host: process.env.host,
    database: process.env.database,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        console.log("connected");
    });
}
// main();
