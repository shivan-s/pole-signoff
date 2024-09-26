ALTER TABLE `users` RENAME COLUMN `username` TO `stagehandle`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_username_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD `private` integer DEFAULT true NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_stagehandle_unique` ON `users` (`stagehandle`);