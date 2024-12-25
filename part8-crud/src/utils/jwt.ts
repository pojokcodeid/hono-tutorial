import { sign, verify } from "hono/jwt";

const secret = "mySecretKey";
const expired = Math.floor(Date.now() / 1000) + 60 * 5; // Token expires in 5 minutes
export const generateAccessToken = async (objSub: any) => {
  const payload = {
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
  } catch (error) {
    throw new Error("Invalid token");
  }
};
