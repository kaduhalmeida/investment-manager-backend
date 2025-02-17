/*
  Warnings:

  - Added the required column `risk` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "valuation" SET DATA TYPE TEXT,
DROP COLUMN "risk",
ADD COLUMN     "risk" JSONB NOT NULL;
