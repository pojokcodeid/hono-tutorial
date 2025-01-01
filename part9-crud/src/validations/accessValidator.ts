import { Context } from "hono";
import { verifyToken } from "../utils/jwt";

// validate header bearer acess token from request
export const validateAccessToken = async (
  c: Context,
  next: () => Promise<void>
) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return c.json({ message: "Unauthorized", data: null }, 401);
  }
  // validate jwt token
  try {
    const payload = await verifyToken(token);
    c.set("user_id", payload.id);
    await next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return c.json({ message: "Unauthorized", data: null }, 401);
  }
};
