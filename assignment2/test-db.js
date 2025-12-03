/********************************************************************************
*  Test Neon Postgres Connection - WORKING VERSION
********************************************************************************/

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false   // Required for Neon
  }
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("NEON POSTGRES CONNECTED SUCCESSFULLY!");
    
    // Test query
    const res = await client.query('SELECT NOW() AS time, version()');
    console.log("DB Time:", res.rows[0].time);
    console.log("PostgreSQL Version:", res.rows[0].version);

    client.release();
  } catch (err) {
    console.error("CONNECTION FAILED:", err.message);
  } finally {
    await pool.end();
  }
})();