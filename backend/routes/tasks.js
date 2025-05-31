const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks ORDER BY id");
  res.json(tasks.rows);
});

// POST new task
router.post("/", async (req, res) => {
  const { description } = req.body;
  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Description is required" });
  }
  const newTask = await pool.query(
    "INSERT INTO tasks (description) VALUES ($1) RETURNING *",
    [description]
  );
  res.json(newTask.rows[0]);
});

// PUT update task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await pool.query("UPDATE tasks SET description = $1 WHERE id = $2", [description, id]);
  res.send("Task updated");
});


// DELETE task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.send("Task deleted");
});

module.exports = router;
