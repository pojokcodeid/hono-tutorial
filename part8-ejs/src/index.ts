import { Hono } from "hono";
import ejs from "ejs";
import { readFile } from "fs/promises";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Middleware untuk melayani file statis
app.use("/public/*", serveStatic({ root: "./" }));

app.get("/", async (ctx) => {
  const templatePath = "./src/views/index.ejs";
  const template = await readFile(templatePath, "utf-8");
  const html = ejs.render(template, {
    title: "World from pojok code",
    data: [
      {
        id: 1,
        name: "John Doe",
        email: "3oZg9@example.com",
      },
    ],
  });
  return ctx.html(html);
});

export default app;
