import { Elysia, t } from "elysia";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../lib/server/db";
import { rooms } from "../lib/server/db/schema";

const roomsBody = t.Object({
  name: t.String(),
  slug: t.String(),
  pricePerNight: t.Number(),
  coverMediaId: t.Optional(t.Nullable(t.Number())),
  excerpt: t.Optional(t.String()),
  description: t.Optional(t.String()),
  capacity: t.Optional(t.Number()),
  isActive: t.Optional(t.Boolean()),
  metaTitle: t.Optional(t.String()),
  metaDescription: t.Optional(t.String()),
});

const notFound = () =>
  new Response(JSON.stringify({ error: "Room tidak ditemukan" }), {
    status: 404,
    headers: { "content-type": "application/json" },
  });

export const roomsRoutes = new Elysia({ prefix: "/rooms" })
  .get("/", () => db.select().from(rooms).where(isNull(rooms.deletedAt)))
  .post(
    "/",
    async ({ body }) => {
      const [row] = await db.insert(rooms).values(body).returning();
      return new Response(JSON.stringify(row), { status: 201 });
    },
    { body: roomsBody },
  )
  .get(
    "/slug/:slug",
    async ({ params: { slug } }) => {
      const [row] = await db
        .select()
        .from(rooms)
        .where(and(eq(rooms.slug, slug), isNull(rooms.deletedAt)));
      if (!row) return notFound();
      return row;
    },
    {
      params: t.Object({ slug: t.String() }),
    },
  )
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const [row] = await db
        .select()
        .from(rooms)
        .where(and(eq(rooms.id, id), isNull(rooms.deletedAt)));
      if (!row) return notFound();
      return row;
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const [row] = await db
        .update(rooms)
        .set({ ...body, updatedAt: new Date() })
        .where(and(eq(rooms.id, id), isNull(rooms.deletedAt)))
        .returning();
      if (!row) return notFound();
      return row;
    },
    { params: t.Object({ id: t.Numeric() }), body: t.Partial(roomsBody) },
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const [row] = await db
        .update(rooms)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(and(eq(rooms.id, id), isNull(rooms.deletedAt)))
        .returning();
      if (!row) return notFound();
      return new Response(null, { status: 204 });
    },
    { params: t.Object({ id: t.Numeric() }) },
  );
