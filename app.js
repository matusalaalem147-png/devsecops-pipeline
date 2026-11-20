// Small Express API for the CI/CD security assignment.
const express = require("express");

const app = express();
app.use(express.json({ limit: "100kb" }));

const tasks = [
  { id: 1, title: "Set up CI pipeline", done: true },
  { id: 2, title: "Add security gates", done: false }
];

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  return res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== "string" || title.trim().length === 0 || title.length > 100) {
    return res.status(400).json({ error: "title must be a non-empty string up to 100 characters" });
  }
  const task = { id: tasks.length + 1, title: title.trim(), done: false };
  tasks.push(task);
  return res.status(201).json(task);
});

// Task 4B fix: return JSON, so user input is never interpreted as HTML (no reflected XSS).
app.get("/greet", (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name.slice(0, 50) : "guest";
  res.json({ message: `Hello ${name}` });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;
