// src/app.ts
import { Hono } from "hono";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

const app = new Hono();
const node = process.env.NODE_ENV || "development";
if (node == "development") {
  app.use("*", logger());
}
app.route("", todoRoutes);
app.route("", userRoutes);
app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      errors: err.message,
    });
  } else {
    c.status(500);
    return c.json({
      errors: err.message,
    });
  }
});

export default app;
