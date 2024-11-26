/*
  Warnings:

  - You are about to drop the column `token` on the `meals` table. All the data in the column will be lost.
  - Added the required column `token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` DROP COLUMN `token`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `token` TINYTEXT NOT NULL;
