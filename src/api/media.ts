import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../lib/server/db";
import { media } from "../lib/server/db/schema";

const mediaBody = t.Object({
  fileName: t.String(),
  filePath: t.String(),
  mimeType: t.String(),
  size: t.Number(),
});

export const mediaRoutes = new Elysia({ prefix: "/media" })
  .get("/", () => db.select().from(media))
  .post(
    "/",
    async ({ body }) => {
      const [row] = await db.insert(media).values(body).returning();
      return new Response(JSON.stringify(row), { status: 201 });
    },
    { body: mediaBody }
  )
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const [row] = await db.select().from(media).where(eq(media.id, id));
      if (!row) {
        return new Response(
          JSON.stringify({ error: "Media tidak ditemukan" }),
          { status: 404, headers: { "content-type": "application/json" } }
        );
      }
      return row;
    },
    { params: t.Object({ id: t.Numeric() }) }
  )
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const [row] = await db
        .update(media)
        .set(body)
        .where(eq(media.id, id))
        .returning();
      if (!row) {
        return new Response(
          JSON.stringify({ error: "Media tidak ditemukan" }),
          { status: 404, headers: { "content-type": "application/json" } }
        );
      }
      return row;
    },
    { params: t.Object({ id: t.Numeric() }), body: t.Partial(mediaBody) }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const [row] = await db
        .delete(media)
        .where(eq(media.id, id))
        .returning();
      if (!row) {
        return new Response(
          JSON.stringify({ error: "Media tidak ditemukan" }),
          { status: 404, headers: { "content-type": "application/json" } }
        );
      }
      return new Response(null, { status: 204 });
    },
    { params: t.Object({ id: t.Numeric() }) }
  );
