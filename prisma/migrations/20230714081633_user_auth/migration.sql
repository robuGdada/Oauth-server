-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(50) NULL,
    `email` VARCHAR(200) NULL,
    `username` VARCHAR(80) NULL,
    `address` VARCHAR(100) NULL,
    `name` VARCHAR(50) NULL,
    `googleToken` VARCHAR(200) NULL,
    `dob` DATETIME NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
