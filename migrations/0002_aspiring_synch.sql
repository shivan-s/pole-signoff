CREATE TABLE `invite_codes` (
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`uuid` text PRIMARY KEY NOT NULL,
	`sender_id` integer NOT NULL,
	`receiver_id` integer,
	FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
