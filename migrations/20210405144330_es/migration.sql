/*
  Warnings:

  - You are about to drop the column `articleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `articleId`,
    DROP COLUMN `roleId`;
