-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('SUBMITTED', 'APPROVED', 'PENDING', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "aimedInstitutionId" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'SUBMITTED',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
