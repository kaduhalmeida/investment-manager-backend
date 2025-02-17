/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `User` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Wallet_name_key";

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "companyId" TEXT NOT NULL,
ALTER COLUMN "risk" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "number",
DROP COLUMN "postalCode",
DROP COLUMN "street",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'INVESTOR';

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "fundsAdded" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "spentAmount" DECIMAL(65,30) NOT NULL DEFAULT 0.00;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT,
    "number" TEXT,
    "city" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sector" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "stage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyTags" (
    "companyId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "CompanyTags_pkey" PRIMARY KEY ("companyId","tagId")
);

-- CreateTable
CREATE TABLE "_CompanyTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompanyTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_CompanyTags_B_index" ON "_CompanyTags"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTags" ADD CONSTRAINT "CompanyTags_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTags" ADD CONSTRAINT "CompanyTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyTags" ADD CONSTRAINT "_CompanyTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyTags" ADD CONSTRAINT "_CompanyTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
