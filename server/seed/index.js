import { seedUsers } from "./seedUsers.js";
import { seedNotes } from "./seedNotes.js";
import pool from "../config/postgres.js";

    const runSeeds = async () => {
    try {
        const users = await seedUsers();
        await seedNotes(users);
        console.log("🌱 All seeds completed successfully.");
    } catch (err) {
        console.error("Seeding failed:", err.message);
    } finally {
        await pool.end(); 
    }
};

runSeeds();
