/*
  Warnings:

  - You are about to drop the `Product_Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product_Category" DROP CONSTRAINT "Product_Category_id_category_fkey";

-- DropForeignKey
ALTER TABLE "Product_Category" DROP CONSTRAINT "Product_Category_id_product_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "id_category" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Product_Category";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
