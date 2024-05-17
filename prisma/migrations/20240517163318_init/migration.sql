/*
  Warnings:

  - You are about to drop the column `institutionId` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'STUDENT';
ALTER TYPE "Role" ADD VALUE 'TEACHER';

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_institutionId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "institutionId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "institutionId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
