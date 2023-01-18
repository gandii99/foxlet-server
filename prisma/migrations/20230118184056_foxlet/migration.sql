/*
  Warnings:

  - A unique constraint covering the columns `[company_name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PESEL]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "is_owner" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_name_key" ON "Company"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_PESEL_key" ON "Employee"("PESEL");
