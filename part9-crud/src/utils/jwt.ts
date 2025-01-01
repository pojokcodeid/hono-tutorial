import { sign, verify } from "hono/jwt";
import { type User } from "@prisma/client";

const secret = "mySecretKey";
const expired = Math.floor(Date.now() / 1000) + 60 * 15; // Token expires in 15 minutes
export const generateAccessToken = async (objSub: User) => {
  const payload = {
    id: objSub.id,
    sub: objSub,
    role: "admin",
    exp: expired,
  };
  const token = await sign(payload, secret);
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const payload = await verify(token, secret);
    return payload;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
