/*
  Warnings:

  - Added the required column `valuation` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "valuation",
ADD COLUMN     "valuation" INTEGER NOT NULL;
