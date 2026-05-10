/*
  Warnings:

  - You are about to drop the column `bookId` on the `UserBook` table. All the data in the column will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `UserBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `UserBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_bookId_fkey";

-- DropIndex
DROP INDEX "UserBook_userId_bookId_key";

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "bookId",
ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Book";

-- CreateIndex
CREATE UNIQUE INDEX "UserBook_userId_title_key" ON "UserBook"("userId", "title");
