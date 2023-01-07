-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_id_company_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "id_company" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "Company"("id_company") ON DELETE SET NULL ON UPDATE CASCADE;
