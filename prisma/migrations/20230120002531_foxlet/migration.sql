/*
  Warnings:

  - A unique constraint covering the columns `[id_owner]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "id_owner" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "PESEL" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_owner_key" ON "Company"("id_owner");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Employee"("id_employee") ON DELETE RESTRICT ON UPDATE CASCADE;
