-- CreateTable
CREATE TABLE `pharmacies` (
    `id` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `openingHours` VARCHAR(191) NOT NULL,
    `responsible` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliations` (
    `id` VARCHAR(191) NOT NULL,
    `pharmacyId` VARCHAR(191) NOT NULL,
    `affiliateId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `affiliations_affiliateId_key`(`affiliateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `affiliations` ADD CONSTRAINT `affiliations_pharmacyId_fkey` FOREIGN KEY (`pharmacyId`) REFERENCES `pharmacies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `affiliations` ADD CONSTRAINT `affiliations_affiliateId_fkey` FOREIGN KEY (`affiliateId`) REFERENCES `pharmacies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
