import { Hono } from "hono";
import { logger } from "./middlewares/logger";
import { responseTime } from "./middlewares/responseTime";
import { userRoute } from "./routes/users";

const app = new Hono();

// Middleware global
app.use("*", logger);
app.use("*", responseTime);

// Rute utama
app.get("/", (c) => c.text("Welcome to Hono.js with TypeScript!"));

// Rute pengguna
app.route("/users", userRoute);

// ini jika ingin jalankan otomatis gunakan port yang free
export default app;

// ini merupakan contoh jalankan dengan port fix
// const port = parseInt(process.env.PORT!) || 3000;

// export default {
//   port,
//   fetch: app.fetch,
// };
