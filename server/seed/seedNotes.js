import pool from "../config/postgres.js";

export const seedNotes = async (users) => {
  try {
    if (!users.length) throw new Error("No users found to assign notes.");

    const user1 = users[0].id;
    const user2 = users[1].id;

    await pool.query(
  `
    INSERT INTO notes (title, content, user_id)
    VALUES 
      ($1, $2, $3),
      ($4, $5, $6),
      ($7, $8, $9)
  `,
  [
    'Note 1', 'This is the first note by Alice.', user1,
    'Note 2', 'Another note by Alice.', user1,
    'Note 3', "Bob's note.", user2
  ]
);

    console.log("✅ Notes seeded.");
  } catch (err) {
    console.error("❌ Failed to seed notes:", err.message);
    throw err;
  }
};
