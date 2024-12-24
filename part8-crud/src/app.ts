// src/app.ts
import { Hono } from "hono";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";

const app = new Hono();

app.route("", todoRoutes);
app.route("", userRoutes);

export default app;
