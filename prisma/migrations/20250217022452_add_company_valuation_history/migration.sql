-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "debt" BOOLEAN,
ADD COLUMN     "debtValue" INTEGER,
ADD COLUMN     "valuationHistory" JSONB;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "type" TEXT;
