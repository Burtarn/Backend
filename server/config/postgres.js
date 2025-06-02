    import dotenv from "dotenv";
    import pkg from "pg";
    import { createTables } from "../services/dbService.js";

    dotenv.config();

    const { Pool } = pkg;

    const POSTGRES_URL = process.env.POSTGRES_URL;

const pool = new Pool({
    connectionString: POSTGRES_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
    });

    const connectToPostgres = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Connected to Postgres");

        client.release();

        await createTables();
        console.log("✅ All tables ensured successfully");
    } catch (err) {
        console.error("❌ Error connecting to Postgres", err.message);
    }
    };

    connectToPostgres();

    export default pool;
