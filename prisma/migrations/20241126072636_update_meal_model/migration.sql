/*
  Warnings:

  - The primary key for the `meals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `mealDBid` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` DROP PRIMARY KEY,
    ADD COLUMN `mealDBid` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
