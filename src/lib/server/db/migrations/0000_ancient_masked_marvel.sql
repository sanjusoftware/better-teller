CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`avatar` text(255),
	`email` text(255),
	`country` text(255),
	`status` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`phone` text(255) NOT NULL,
	`egn` text(255) NOT NULL,
	`body` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
