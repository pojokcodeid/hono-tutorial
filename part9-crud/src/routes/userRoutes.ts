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
import { validateAccessToken } from "../validations/accessValidator";

const router = new Hono();

router.get("/users", validateAccessToken, getUsers);
router.get("/users/:id", validateAccessToken, getUser);
router.post("/users", addUser);
router.put("/users/:id", validateAccessToken, editUser);
router.delete("/users/:id", validateAccessToken, removeUser);
router.post("/login", loginUser);

export default router;
