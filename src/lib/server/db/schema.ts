import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { title } from "node:process";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const media = pgTable("media", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  filePath: text("file_path").notNull(),
  mimeType: varchar("mime_type", { length: 255 }).notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  mediaId: integer("media_id").references(() => media.id),
  title: varchar("title", { length: 255 }),
  category: varchar("category", { length: 255 }),
  sortOrder: integer("sort_order").default(0),
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

export const facilities = pgTable("facilities", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon"),
  sortOrder: integer("sort_order").default(0),
});

export const roomFacilities = pgTable("room_facilities", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  roomId: integer("room_id").references(() => rooms.id),
  facilityId: integer("facility_id").references(() => facilities.id),
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

export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  authorId: integer("author_id").notNull(),
  coverMediaId: integer("cover_media_id").references(() => media.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: varchar("excerpt", { length: 500 }),
  content: text("content"),
  status: varchar("status", { length: 50 }),
  metaTitle: varchar("meta_title", { length: 255 }).unique(),
  metaDescription: varchar("meta_description", { length: 255 }).unique(),
  publishAt: timestamp("publish_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const pages = pgTable("pages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: varchar("meta_description", { length: 500 }),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const faqs = pgTable("faqs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("unread").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const settings = pgTable("settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  settingKey: varchar("setting_key", { length: 255 }).notNull().unique(),
  settingValue: text("setting_value"),
  type: varchar("type", { length: 50 }).default("string").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});
