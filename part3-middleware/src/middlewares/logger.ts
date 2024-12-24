import { MiddlewareHandler } from "hono";

export const logger: MiddlewareHandler = async (c, next) => {
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.url}`);
  await next();
};
