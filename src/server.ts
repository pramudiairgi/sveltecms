import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: { title: "Villa CMS API", version: "0.1.0" },
      },
    })
  )
  .get("/health", () => ({ status: "ok" }))
  .onError(({ error, code }) => {
    if (code === "VALIDATION") {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 422,
        headers: { "content-type": "application/json" },
      });
    }
    if (code === "NOT_FOUND") {
      return new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  })
  .listen({ port: 3000, hostname: "127.0.0.1" });

console.log("API jalan di http://127.0.0.1:3000");

export type App = typeof app;
