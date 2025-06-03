import pool from "../config/postgres.js";

export const seedUsers = async () => {
  try {
    // Rensa befintliga data
    await pool.query("DELETE FROM notes"); // måste rensas först pga foreign key
    await pool.query("DELETE FROM users");

    // Lägg till testanvändare
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
