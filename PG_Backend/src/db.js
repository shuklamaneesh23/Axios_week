import pg from 'pg'; // Default import for CommonJS module
const { Pool } = pg;

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Export the query method
export const query = (text, params) => pool.query(text, params);

export default pool;
