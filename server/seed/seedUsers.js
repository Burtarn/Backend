import pool from "../config/postgres.js";

export const seedUsers = async () => {
  try {

    await pool.query("DELETE FROM notes"); 
    await pool.query("DELETE FROM users");

    const result = await pool.query(`
      INSERT INTO users (username, password)
      VALUES 
        ('alice', 'hashed_password_1'),
        ('bob', 'hashed_password_2')
      RETURNING *;
    `);

    console.log("✅ Users seeded.");
    return result.rows;
  } catch (err) {
    console.error("❌ Failed to seed users:", err.message);
    throw err;
  }
};
