// src/routes/userRoutes.ts
import { Hono } from "hono";
import {
  getUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
  loginUser,
} from "../controllers/userController";
import { validateAccessToken } from "../controllers/errorController";
import { validator } from "hono/validator";

const validate = validator("json", (value, c) => {
  if (!value.name || !value.email || !value.password) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.email)) {
    return c.json({ message: "Invalid email format" }, 400);
  }

  // Validasi password kuat
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(value.password)) {
    return c.json(
      {
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
      400
    );
  }
  return value;
});

const router = new Hono();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", validate, addUser);
router.put("/users/:id", validateAccessToken, editUser);
router.delete("/users/:id", validateAccessToken, removeUser);
router.post("/login", loginUser);

export default router;
