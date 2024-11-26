/*
  Warnings:

  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_id_idx` ON `users`;

-- DropIndex
DROP INDEX `users_username_idx` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `token`;

-- CreateTable
CREATE TABLE `meals` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ingredients` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `meals_id_userId_idx`(`id`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `users_id_username_email_handphone_idx` ON `users`(`id`, `username`, `email`, `handphone`);

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
