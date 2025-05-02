import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host:"localhost",
    port: 5432,
    database: "Barberia"
});

module.exports =pool;