import pool from "./db";

app.get("/api/test-db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ connected: false, error });
  }
});
