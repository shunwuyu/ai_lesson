-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `size` BIGINT NOT NULL,
    `chunkSize` INTEGER NOT NULL,
    `totalChunks` INTEGER NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `storagePath` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'UPLOADING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `File_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadSession` (
    `id` VARCHAR(191) NOT NULL,
    `fileId` VARCHAR(191) NULL,
    `filename` VARCHAR(191) NOT NULL,
    `size` BIGINT NOT NULL,
    `chunkSize` INTEGER NOT NULL,
    `totalChunks` INTEGER NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `uploadedChunks` JSON NOT NULL,
    `paused` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UploadSession_hash_idx`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UploadSession` ADD CONSTRAINT `UploadSession_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
