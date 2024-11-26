-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(25) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `handphone` VARCHAR(12) NOT NULL,
    `token` VARCHAR(255) NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_handphone_key`(`handphone`),
    INDEX `users_id_idx`(`id`),
    INDEX `users_username_idx`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
