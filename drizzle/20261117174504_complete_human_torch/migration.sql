CREATE TABLE "contact_messages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contact_messages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"subject" varchar(255),
	"message" text NOT NULL,
	"status" varchar(50) DEFAULT 'unread' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "facilities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "facilities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"icon" varchar,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "faqs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question" varchar(255) NOT NULL,
	"answer" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gallery_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"media_id" integer,
	"title" varchar(255),
	"category" varchar(255),
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(255) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"content" text,
	"meta_title" varchar(255),
	"meta_description" varchar(500),
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"author_id" integer NOT NULL,
	"cover_media_id" integer,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"excerpt" varchar(500),
	"content" text,
	"status" varchar(50),
	"meta_title" varchar(255),
	"meta_description" varchar(255),
	"publish_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "room_facilities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "room_facilities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"room_id" integer NOT NULL,
	"facility_id" integer NOT NULL,
	CONSTRAINT "room_facilities_room_id_facility_id_unique" UNIQUE("room_id","facility_id")
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "settings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"setting_key" varchar(255) NOT NULL UNIQUE,
	"setting_value" text,
	"type" varchar(50) DEFAULT 'string' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_media_id_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_media_id_media_id_fkey" FOREIGN KEY ("cover_media_id") REFERENCES "media"("id");--> statement-breakpoint
ALTER TABLE "room_facilities" ADD CONSTRAINT "room_facilities_room_id_rooms_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id");--> statement-breakpoint
ALTER TABLE "room_facilities" ADD CONSTRAINT "room_facilities_facility_id_facilities_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id");