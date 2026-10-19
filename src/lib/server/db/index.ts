import { drizzle } from "drizzle-orm/bun-sql";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL belum di set di .env ");
}
export const db = drizzle(url);
