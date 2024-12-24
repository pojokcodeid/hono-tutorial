import { MiddlewareHandler } from "hono";

export const responseTime: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}ms`);
};
