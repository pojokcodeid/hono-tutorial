import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

const app = new Hono();

// Helper: `text`
app.get("/", (c) => {
  return c.text("Welcome to Hono.js Helpers!");
});

// Helper: `json`
app.get("/json", (c) => {
  return c.json({ message: "This is a JSON response", status: "success" });
});

// Helper: `html`
app.get("/html", (c) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hono.js Example</title>
      </head>
      <body>
        <h1>Hello from Hono.js!</h1>
      </body>
    </html>
  `;
  return c.html(htmlContent);
});

// Helper: `redirect`
app.get("/redirect", (c) => {
  return c.redirect("/json");
});

// Helper: `cookie`
// Set cookie
app.get("/set-cookie", (c) => {
  setCookie(c, "session_id", "abc123", {
    maxAge: 3600, // Cookie berlaku selama 1 jam
    httpOnly: true, // Hanya dapat diakses oleh server
    secure: true, // Hanya digunakan dalam koneksi HTTPS
  });
  return c.text("Cookie has been set!");
});

// Get cookie
app.get("/get-cookie", (c) => {
  const sessionId = getCookie(c, "session_id");
  if (sessionId) {
    return c.text(`Session ID: ${sessionId}`);
  } else {
    return c.text("No session cookie found.");
  }
});

// Delete cookie
app.get("/delete-cookie", (c) => {
  deleteCookie(c, "session_id");
  return c.text("Cookie has been deleted!");
});

export default app;
