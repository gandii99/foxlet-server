-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "id_employee" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id_employee") ON DELETE CASCADE ON UPDATE CASCADE;
