CREATE TABLE `emails` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `moves` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`level` integer NOT NULL,
	`rank` integer,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `user_moves` (
	`id` integer PRIMARY KEY NOT NULL,
	`move_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`achieved_at` text DEFAULT TIMESTAMP NOT NULL,
	FOREIGN KEY (`move_id`) REFERENCES `moves`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);