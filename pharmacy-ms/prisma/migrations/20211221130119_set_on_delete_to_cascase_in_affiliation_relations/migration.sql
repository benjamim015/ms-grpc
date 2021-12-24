-- DropForeignKey
ALTER TABLE `affiliations` DROP FOREIGN KEY `affiliations_affiliateId_fkey`;

-- DropForeignKey
ALTER TABLE `affiliations` DROP FOREIGN KEY `affiliations_pharmacyId_fkey`;

-- AddForeignKey
ALTER TABLE `affiliations` ADD CONSTRAINT `affiliations_pharmacyId_fkey` FOREIGN KEY (`pharmacyId`) REFERENCES `pharmacies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `affiliations` ADD CONSTRAINT `affiliations_affiliateId_fkey` FOREIGN KEY (`affiliateId`) REFERENCES `pharmacies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
