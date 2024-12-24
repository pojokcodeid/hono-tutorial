import { Hono } from "hono";

export const userRoute = new Hono();

const users: Record<string, { id: number; name: string }> = {
  "1": { id: 1, name: "Alice" },
  "2": { id: 2, name: "Bob" },
};

userRoute.get("/:id", (c) => {
  const id = c.req.param("id");
  const user = users[id];
  if (user) {
    return c.json(user);
  }
  return c.text("User not found", 404);
});
