import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Endpoint menggunakan `Request`
app.get("/request", (c) => {
  const method = c.req.method; // GET
  const url = c.req.url; // URL lengkap
  const query = c.req.query("name") || "Guest"; // Query string ?name=
  const header = c.req.header("User-Agent"); // Header User-Agent

  return c.json({
    message: `Hello, ${query}!`,
    method,
    url,
    userAgent: header || "Unknown",
  });
});

// Endpoint menggunakan `Response`
app.post("/response", async (c) => {
  const body = await c.req.json<{ name: string }>(); // Ambil payload JSON
  const name = body?.name || "Guest"; // Nama dari payload

  c.res.headers.set("X-Custom-Header", "HonoJS"); // Tambahkan header kustom
  return c.json({
    message: `Hello, ${name}! Your response was successful.`,
  });
});

export default app;
