CREATE TABLE IF NOT EXISTS "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"uuid" uuid,
	"filename" text NOT NULL,
	"file_type" text NOT NULL,
	CONSTRAINT "files_uuid_unique" UNIQUE("uuid")
);
