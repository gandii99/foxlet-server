/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NIP]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[REGON]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pallet" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_user_key" ON "Employee"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_NIP_key" ON "Supplier"("NIP");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_REGON_key" ON "Supplier"("REGON");
