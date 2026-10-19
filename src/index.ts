import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL belum di set di .env");
}

const db = drizzle(url);
const result = await db.execute(sql`select version()`);
console.log("Terhubung ke Postgres:", result);
