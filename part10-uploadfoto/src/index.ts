import { Hono } from "hono";
import { uploadRoute } from "./routes/upload";

const app = new Hono();

// Daftarkan route untuk upload
app.route("/upload", uploadRoute);

export default app;
