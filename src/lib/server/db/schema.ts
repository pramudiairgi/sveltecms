import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  filePath: text("file_path").notNull(),
  mimeType: varchar("mime_type", { length: 255 }).notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rooms = pgTable("rooms", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  coverMediaId: integer("cover_media_id").references(() => media.id),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: varchar("excerpt", { length: 500 }),
  description: text("description"),
  pricePerNight: integer("price_per_night").notNull(),
  capacity: integer("capacity").notNull().default(2),
  isActive: boolean("is_active").notNull().default(true),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: varchar("meta_description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const packages = pgTable("packages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  coverMediaId: integer("cover_media_id").references(() => media.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }),
  pricePerPerson: integer("price_per_person").notNull(),
  duration: varchar("duration", { length: 100 }),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: varchar("meta_description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
