/*
  Warnings:

  - Added the required column `bookmarked` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` ADD COLUMN `bookmarked` BOOLEAN NOT NULL,
    ADD COLUMN `token` TINYTEXT NOT NULL,
    MODIFY `instructions` TEXT NOT NULL;
