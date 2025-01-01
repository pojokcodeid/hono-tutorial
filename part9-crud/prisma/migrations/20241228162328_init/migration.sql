/*
  Warnings:

  - You are about to drop the column `user_id` on the `todo` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_user_id_fkey`;

-- DropIndex
DROP INDEX `Todo_user_id_fkey` ON `todo`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `user_id`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
