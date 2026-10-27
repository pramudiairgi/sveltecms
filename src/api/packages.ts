import { Elysia, t } from "elysia";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../lib/server/db";
import { packages } from "../lib/server/db/schema";

const packagesBody = t.Object({
  title: t.String(),
  slug: t.String(),
  pricePerPerson: t.Number(),
  coverMediaId: t.Optional(t.Nullable(t.Number())),
  category: t.Optional(t.String()),
  duration: t.Optional(t.String()),
  description: t.Optional(t.String()),
  isActive: t.Optional(t.Boolean()),
  metaTitle: t.Optional(t.String()),
  metaDescription: t.Optional(t.String()),
});

const notFound = () =>
  new Response(JSON.stringify({ error: "Paket tidak ditemukan" }), {
    status: 404,
    headers: { "content-type": "application/json" },
  });

export const packagesRoutes = new Elysia({ prefix: "/packages" })
  .get("/", () => db.select().from(packages).where(isNull(packages.deletedAt)))
  .post(
    "/",
    async ({ body }) => {
      const [row] = await db.insert(packages).values(body).returning();
      return new Response(JSON.stringify(row), { status: 201 });
    },
    { body: packagesBody },
  )
  .get(
    "/slug/:slug",
    async ({ params: { slug } }) => {
      const [row] = await db
        .select()
        .from(packages)
        .where(and(eq(packages.slug, slug), isNull(packages.deletedAt)));
      if (!row) return notFound();
      return row;
    },
    { params: t.Object({ slug: t.String() }) },
  )
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const [row] = await db
        .select()
        .from(packages)
        .where(and(eq(packages.id, id), isNull(packages.deletedAt)));
      if (!row) return notFound();
      return row;
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const [row] = await db
        .update(packages)
        .set({ ...body, updatedAt: new Date() })
        .where(and(eq(packages.id, id), isNull(packages.deletedAt)))
        .returning();
      if (!row) return notFound();
      return row;
    },
    { params: t.Object({ id: t.Numeric() }), body: t.Partial(packagesBody) },
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const [row] = await db
        .update(packages)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(and(eq(packages.id, id), isNull(packages.deletedAt)))
        .returning();
      if (!row) return notFound();
      return new Response(null, { status: 204 });
    },
    { params: t.Object({ id: t.Numeric() }) },
  );
