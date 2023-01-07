/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Condition` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Pallet` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition_name` to the `Condition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_name` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Condition" DROP COLUMN "name",
ADD COLUMN     "condition_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pallet" DROP COLUMN "name",
ADD COLUMN     "pallet_name" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name",
ADD COLUMN     "product_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "name",
ADD COLUMN     "status_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "name",
ADD COLUMN     "supplier_name" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "user_name" TEXT NOT NULL DEFAULT 'Nazwa';
