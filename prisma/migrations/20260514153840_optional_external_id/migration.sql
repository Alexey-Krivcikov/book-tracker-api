/*
  Warnings:

  - A unique constraint covering the columns `[userId,externalId]` on the table `UserBook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBook_userId_title_key";

-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "externalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserBook_userId_externalId_key" ON "UserBook"("userId", "externalId");
