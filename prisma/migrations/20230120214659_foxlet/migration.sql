/*
  Warnings:

  - You are about to drop the column `company_name` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "company_name",
ADD COLUMN     "client_name" TEXT,
ADD COLUMN     "id_employee" INTEGER,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "province" DROP NOT NULL,
ALTER COLUMN "postal_code" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id_employee") ON DELETE SET NULL ON UPDATE CASCADE;
