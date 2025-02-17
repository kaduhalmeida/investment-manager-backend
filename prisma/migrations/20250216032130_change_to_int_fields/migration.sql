/*
  Warnings:

  - You are about to alter the column `amount` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `profitability` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `unitPrice` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `sellPrice` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `balance` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `fundsAdded` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `spentAmount` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Investment" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "profitability" SET DEFAULT 0,
ALTER COLUMN "profitability" SET DATA TYPE INTEGER,
ALTER COLUMN "unitPrice" SET DEFAULT 0,
ALTER COLUMN "unitPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "sellPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE INTEGER,
ALTER COLUMN "fundsAdded" SET DEFAULT 0,
ALTER COLUMN "fundsAdded" SET DATA TYPE INTEGER,
ALTER COLUMN "spentAmount" SET DEFAULT 0,
ALTER COLUMN "spentAmount" SET DATA TYPE INTEGER;
