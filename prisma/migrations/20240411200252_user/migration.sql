/*
  Warnings:

  - You are about to alter the column `isActive` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `isActive` BOOLEAN NULL;
