ALTER TABLE `users`
RENAME COLUMN `username` TO `stagehandle`;

DROP INDEX IF EXISTS `users_username_unique`;

ALTER TABLE `users` ADD `private` integer DEFAULT true NOT NULL;

CREATE UNIQUE INDEX `users_stagehandle_unique` ON `users` (`stagehandle`);
