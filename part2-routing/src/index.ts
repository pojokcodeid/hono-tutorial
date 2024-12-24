import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// pendefinisian route dasar
app.get("/dasar", (c) => c.text("DASAR GET /"));
app.post("/dasar", (c) => c.text("DASARPOST /"));
app.put("/dasar", (c) => c.text("DASAR PUT /"));
app.delete("/dasar", (c) => c.text("DASAR DELETE /"));

// Rute dengan Wildcard
app.get("/wild/*/card", (c) => {
  return c.text("GET /wild/*/card");
});

// menangani semua method
app.all("/hello", (c) => c.text("Any Method /hello"));

//  menangani method custom
// test gunakan curl
// curl -X PURGE http://localhost:3000/cache
app.on("PURGE", "/cache", (c) => {
  return c.text("PURGE Method /cache");
});
app.on("PATCH", "/cache", (c) => {
  return c.text("PATCH Custem Method /cache");
});

// Beberapa Metode pada Satu Rute
app.on(["PUT", "DELETE"], "/post", (c) => c.text("PUT or DELETE /post"));

// beberapa jalur dalam 1 route
app.on("GET", ["/hello", "/ja/hello", "/en/hello"], (c) => c.text("Hello"));

// dengan parameter
app.get("/user/:name", (c) => {
  const name = c.req.param("name");
  return c.text(`Hello, ${name}!`);
});

// multiple parameter
app.get("/posts/:id/comment/:comment_id", (c) => {
  const { id, comment_id } = c.req.param();
  return c.text(`Post ID: ${id}, Comment ID: ${comment_id}`);
});

// route dengan parameter optional
app.get("/api/animal/:type?", (c) => c.text("Animal!"));

// parametr dengan regex
app.get("/post/:date{[0-9]+}/:title{[a-z]+}", (c) => {
  const { date, title } = c.req.param();
  return c.text(`Date: ${date}, Title: ${title}`);
});

// Parameter yang Mencakup Tanda Slash
app.get("/posts/:filename{.+\\.png}", (c) => {
  const filename = c.req.param("filename");
  return c.text(`Filename: ${filename}`);
});

// chaining route
app
  .get("/endpoint", (c) => c.text("GET /endpoint"))
  .post((c) => c.text("POST /endpoint"))
  .delete((c) => c.text("DELETE /endpoint"));

// Pengelompokan Rute
const book = new Hono();

book.get("/", (c) => c.text("List Books")); // GET /book
book.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`Get Book: ${id}`);
});
book.post("/", (c) => c.text("Create Book")); // POST /book

app.route("/book", book);

export default app;
