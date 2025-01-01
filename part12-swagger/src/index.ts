import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { readFileSync } from "fs";
import path = require("path");
import { z } from "zod";

const app = new OpenAPIHono();

// The openapi.json will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

// basic route
// ------ added code -------
const basicRoute = createRoute({
  method: "get",
  path: "/basic/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            hello: z.string(),
          }),
        },
      },
      description: "say hello",
    },
  },
});

app.openapi(basicRoute, (c) => {
  return c.json({ hello: "world" }, 200);
});
// ------ end added code -------

// Examples:

// Params and Query
// params and query can only be string
// if it's not string hono will return never on c.req.valid("query")
// if you want type other than string, do parsing and validation on route
// but you can still at type on openapi schema by adding key type
const pathAndQueryRoute = createRoute({
  method: "get",
  path: "/path-and-query/{id}",
  request: {
    query: z.object({
      a: z.string().openapi({
        param: {
          name: "a",
          in: "query",
        },
        type: "integer",
        example: "1",
      }),
      b: z
        .string()
        .optional()
        .openapi({
          param: {
            name: "b",
            in: "query",
            required: false,
          },
          type: "integer",
          example: "2",
        }),
    }),
    params: z.object({
      id: z.string().openapi({
        param: {
          name: "id",
          in: "path",
        },
        type: "integer", // <- you can still add type by adding key type
        example: "1",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            a: z.string(),
            b: z.string().nullable().optional(),
          }),
        },
      },
      description: "Ok Response",
    },
  },
});

app.openapi(pathAndQueryRoute, (c) => {
  const { id } = c.req.valid("param");
  const { a, b } = c.req.valid("query");
  return c.json({ id, a, b: b || null }, 200);
});

// Form Data
const formDataRoute = createRoute({
  method: "post",
  path: "/form-data/",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z
            .object({
              foo: z.string(),
              bar: z.string(),
              image: z.instanceof(File).or(z.string()).openapi({
                type: "string",
                format: "binary",
              }),
            })
            .openapi({
              required: ["foo"],
            }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            foo: z.string(),
            bar: z.string().nullable(),
            image: z.string().nullable(),
          }),
        },
      },
      description: "form data ok response",
    },
  },
});

app.openapi(formDataRoute, (c) => {
  const { foo, bar, image } = c.req.valid("form");

  if (image instanceof File) {
    // save file code here
  }

  return c.json(
    {
      foo,
      bar,
      image: image instanceof File ? image.name : null,
    },
    200
  );
});

// Download File
const downloadFileRoute = createRoute({
  method: "get",
  path: "/download-file/",
  summary: "download file",
  request: {
    query: z.object({
      contentType: z
        .union([z.literal("image/png"), z.literal("application/octet-stream")])
        .default("image/png"),
    }),
  },
  responses: {
    200: {
      content: {
        "image/png": {
          schema: z.any().openapi({
            type: "object",
            format: "binary",
          }),
        },
        "application/octet-stream": {
          schema: z.any().openapi({
            type: "object",
            format: "binary",
          }),
        },
      },
      description:
        "Return file, contentType can be image/png or application/octet-stream",
    },
  },
});

// disable ts check because hono openapi cannot validate raw response
// @ts-ignore: Unreachable code error
app.openapi(downloadFileRoute, async (c) => {
  const { contentType } = await c.req.valid("query");
  const payload = readFileSync(path.join("static", "Wikipedia-logo.png"));
  if (contentType === "image/png") {
    return new Response(payload, {
      headers: {
        "content-type": "image/png",
      },
      status: 200,
    });
  } else {
    return new Response(payload, {
      headers: {
        "content-type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="wikipedia.png"',
      },
      status: 200,
    });
  }
});

// Security (AuthorizationApiKey)
// Register security scheme
// add it on your index.ts
app.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationApiKey", // <- Add security name
  {
    type: "apiKey",
    name: "X-API-KEY",
    in: "header",
  }
);

const protectedApiKeyRoute = createRoute({
  method: "get",
  path: "/protected-api-key/",
  summary: "Protected api-key Example",
  security: [
    {
      AuthorizationApiKey: [], // <- Add security name (must be same)
    },
  ],
  request: {
    headers: z.object({
      "x-api-key": z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Authorized Response",
    },
    401: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
      description: "Unauthorized Response",
    },
  },
});

app.openapi(protectedApiKeyRoute, (c) => {
  const { "x-api-key": apiKey } = c.req.valid("header");
  // or
  console.log(c.req.header()["x-api-key"]);
  if (apiKey) {
    return c.json(
      {
        message: "Hello",
      },
      200
    );
  }
  return c.json(
    {
      error: "Unauthorized",
    },
    401
  );
});

// Security (Bearer)
// Register security scheme
// add it on your index.ts
app.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer", // <- Add security name
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  }
);

export const protectedBearerRoute = createRoute({
  method: "get",
  path: "/protected-bearer/",
  summary: "Protected bearer Route Example",
  security: [
    {
      AuthorizationBearer: [], // <- Add security name (must be same)
    },
  ],
  request: {
    headers: z.object({
      authorization: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Authorized Response",
    },
    401: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
      description: "Unauthorized Response",
    },
  },
});

app.openapi(protectedBearerRoute, (c) => {
  const { authorization } = c.req.valid("header");
  // or
  console.log(c.req.header()["authorization"]);
  if (authorization) {
    return c.json(
      {
        message: "Hello",
      },
      200
    );
  }
  return c.json(
    {
      error: "Unauthorized",
    },
    401
  );
});

// swagger ui doc will be available at {server url}/ui
// fell free to change the url
// swaggerUI url must have same path as openapi.json
app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
