import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql";
import { media, rooms } from "./lib/server/db/schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL belum di set di .env");

const db = drizzle(url);

// 1. INSERT media (nanti dipakai sebagai cover salah satu room)
const [mediaRow] = await db
  .insert(media)
  .values({
    fileName: "cemara.jpg",
    filePath: "/uploads/cemara.jpg",
    mimeType: "image/jpeg",
    size: 204800,
  })
  .returning();
console.log("1. Media tersimpan:", mediaRow);

// 2. INSERT room DENGAN cover (menunjuk ke media di atas)
const [roomCemara] = await db
  .insert(rooms)
  .values({
    name: "Cemara",
    slug: "cemara",
    excerpt: "Kamar nyaman dengan pemandangan taman.",
    pricePerNight: 500000,
    coverMediaId: mediaRow.id,
  })
  .returning();
console.log("2. Room tersimpan:", roomCemara);

// 3. INSERT room TANPA cover (bukti cover_media_id boleh kosong)
const [roomMermaid] = await db
  .insert(rooms)
  .values({
    name: "Mermaid",
    slug: "mermaid",
    pricePerNight: 750000,
  })
  .returning();
console.log("3. Room tersimpan:", roomMermaid);

// 4. SELECT semua rooms
const semuaRooms = await db.select().from(rooms);
console.log("4. Semua rooms:", semuaRooms);

// 5. UJI FK: cover_media_id 999999 tidak ada -> harus DITOLAK Postgres
try {
  await db.insert(rooms).values({
    name: "Test FK",
    slug: "test-fk",
    pricePerNight: 100000,
    coverMediaId: 999999,
  });
  console.log("5. ❌ Harusnya gagal, tapi berhasil. Ada yang salah!");
} catch (error) {
  console.log("5. ✅ Postgres menolak insert ini (FK bekerja). Detail error:");
  console.log(error);
}

// 6. UPDATE: naikkan harga room Cemara
const [roomUpdated] = await db
  .update(rooms)
  .set({ pricePerNight: 550000 })
  .where(eq(rooms.id, roomCemara.id))
  .returning();
console.log("6. Room setelah update:", roomUpdated);
