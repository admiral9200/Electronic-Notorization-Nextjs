/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `institutions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet]` on the table `institutions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "wallet" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "institutions_email_key" ON "institutions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_wallet_key" ON "institutions"("wallet");
