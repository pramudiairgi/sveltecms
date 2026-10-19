CREATE TABLE "packages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "packages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cover_media_id" integer,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"category" varchar(100),
	"price_per_person" integer NOT NULL,
	"duration" varchar(100),
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"meta_title" varchar(255),
	"meta_description" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rooms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cover_media_id" integer,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"excerpt" varchar(500),
	"description" text,
	"price_per_night" integer NOT NULL,
	"capacity" integer DEFAULT 2 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"meta_title" varchar(255),
	"meta_description" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_cover_media_id_media_id_fkey" FOREIGN KEY ("cover_media_id") REFERENCES "media"("id");--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_cover_media_id_media_id_fkey" FOREIGN KEY ("cover_media_id") REFERENCES "media"("id");