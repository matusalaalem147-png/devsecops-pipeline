const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app");

let server;
let base;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
});

test("GET /health returns ok", async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 201);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET /tasks returns a list", async () => {
  const res = await fetch(`${base}/tasks`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  assert.ok(body.length >= 2);
});

test("GET /tasks/:id rejects a non-numeric id", async () => {
  const res = await fetch(`${base}/tasks/abc`);
  assert.equal(res.status, 400);
});

test("GET /tasks/:id returns 404 for a missing task", async () => {
  const res = await fetch(`${base}/tasks/999`);
  assert.equal(res.status, 404);
});

test("POST /tasks validates the title", async () => {
  const res = await fetch(`${base}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "" })
  });
  assert.equal(res.status, 400);
});

test("POST /tasks creates a task", async () => {
  const res = await fetch(`${base}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Write tests" })
  });
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.title, "Write tests");
});
