import { query } from '../db.js'; // Importing query from db.js

// Function to create a new user
export const createUser = async (req, res) => {
  const { email, username } = req.body;
  try {
    const result = await query(
      'INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *',
      [email, username]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get username by email
export const getUsernameByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await query(
      'SELECT username FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length > 0) {
      res.json({ username: result.rows[0].username });
    } else {
      console.error(email);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
