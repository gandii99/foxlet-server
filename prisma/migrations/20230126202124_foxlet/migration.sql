-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_id_pallet_fkey";

-- DropForeignKey
ALTER TABLE "Batch_Order" DROP CONSTRAINT "Batch_Order_id_batch_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_id_owner_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Pallet" DROP CONSTRAINT "Pallet_id_employee_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Employee"("id_employee") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pallet" ADD CONSTRAINT "Pallet_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id_employee") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_id_pallet_fkey" FOREIGN KEY ("id_pallet") REFERENCES "Pallet"("id_pallet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch_Order" ADD CONSTRAINT "Batch_Order_id_batch_fkey" FOREIGN KEY ("id_batch") REFERENCES "Batch"("id_batch") ON DELETE CASCADE ON UPDATE CASCADE;
