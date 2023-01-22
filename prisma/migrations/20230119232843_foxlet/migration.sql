/*
  Warnings:

  - You are about to drop the column `is_owner` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `id_owner` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "id_owner" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "is_owner";
