import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { mediaRoutes } from "./api/media";
import { roomsRoutes } from "./api/rooms";
import { packagesRoutes } from "./api/packages";

export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: { title: "Villa CMS API", version: "0.1.0" },
      },
    })
  )
  .use(mediaRoutes)
  .use(roomsRoutes)
  .use(packagesRoutes)
  .get("/health", () => ({ status: "ok" }))
  .onError(({ error, code }) => {
    const message = error instanceof Error ? error.message : String(error);
    if (code === "VALIDATION") {
      return new Response(JSON.stringify({ error: message }), {
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
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  })
  .listen({ port: 3000, hostname: "127.0.0.1" });

console.log("API jalan di http://127.0.0.1:3000");

export type App = typeof app;
