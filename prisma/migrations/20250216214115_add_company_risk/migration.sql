/*
  Warnings:

  - Changed the type of `risk` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "risk",
ADD COLUMN     "risk" JSONB NOT NULL;
