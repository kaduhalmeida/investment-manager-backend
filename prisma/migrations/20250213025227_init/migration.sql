/*
  Warnings:

  - Added the required column `purchaseDate` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risk` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "profitability" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "risk" TEXT NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
