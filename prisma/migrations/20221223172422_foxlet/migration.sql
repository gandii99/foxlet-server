/*
  Warnings:

  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_statusu` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `nazwa` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `opis` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the `Dostawca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Firma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kategoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kategoria_Produktu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Klient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paleta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partia_Zamowienie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pracownik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produkt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status_Zamowienia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Uzytkownik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zamowienie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kategoria_Produktu" DROP CONSTRAINT "Kategoria_Produktu_id_kategorii_fkey";

-- DropForeignKey
ALTER TABLE "Kategoria_Produktu" DROP CONSTRAINT "Kategoria_Produktu_id_produktu_fkey";

-- DropForeignKey
ALTER TABLE "Klient" DROP CONSTRAINT "Klient_id_uzytkownika_fkey";

-- DropForeignKey
ALTER TABLE "Paleta" DROP CONSTRAINT "Paleta_id_dostawcy_fkey";

-- DropForeignKey
ALTER TABLE "Paleta" DROP CONSTRAINT "Paleta_id_pracownika_fkey";

-- DropForeignKey
ALTER TABLE "Partia" DROP CONSTRAINT "Partia_id_palety_fkey";

-- DropForeignKey
ALTER TABLE "Partia" DROP CONSTRAINT "Partia_id_produktu_fkey";

-- DropForeignKey
ALTER TABLE "Partia" DROP CONSTRAINT "Partia_id_stanu_fkey";

-- DropForeignKey
ALTER TABLE "Partia_Zamowienie" DROP CONSTRAINT "Partia_Zamowienie_id_partii_fkey";

-- DropForeignKey
ALTER TABLE "Partia_Zamowienie" DROP CONSTRAINT "Partia_Zamowienie_id_zamowienia_fkey";

-- DropForeignKey
ALTER TABLE "Pracownik" DROP CONSTRAINT "Pracownik_id_firmy_fkey";

-- DropForeignKey
ALTER TABLE "Pracownik" DROP CONSTRAINT "Pracownik_id_uzytkownika_fkey";

-- DropForeignKey
ALTER TABLE "Status_Zamowienia" DROP CONSTRAINT "Status_Zamowienia_id_pracownika_fkey";

-- DropForeignKey
ALTER TABLE "Status_Zamowienia" DROP CONSTRAINT "Status_Zamowienia_id_statusu_fkey";

-- DropForeignKey
ALTER TABLE "Status_Zamowienia" DROP CONSTRAINT "Status_Zamowienia_id_zamowienia_fkey";

-- DropForeignKey
ALTER TABLE "Zamowienie" DROP CONSTRAINT "Zamowienie_id_klienta_fkey";

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "id_statusu",
DROP COLUMN "nazwa",
DROP COLUMN "opis",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id_status" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("id_status");

-- DropTable
DROP TABLE "Dostawca";

-- DropTable
DROP TABLE "Firma";

-- DropTable
DROP TABLE "Kategoria";

-- DropTable
DROP TABLE "Kategoria_Produktu";

-- DropTable
DROP TABLE "Klient";

-- DropTable
DROP TABLE "Paleta";

-- DropTable
DROP TABLE "Partia";

-- DropTable
DROP TABLE "Partia_Zamowienie";

-- DropTable
DROP TABLE "Pracownik";

-- DropTable
DROP TABLE "Produkt";

-- DropTable
DROP TABLE "Stan";

-- DropTable
DROP TABLE "Status_Zamowienia";

-- DropTable
DROP TABLE "Uzytkownik";

-- DropTable
DROP TABLE "Zamowienie";

-- CreateTable
CREATE TABLE "Company" (
    "id_company" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "NIP" TEXT NOT NULL,
    "REGON" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id_company")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id_employee" SERIAL NOT NULL,
    "id_company" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "PESEL" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id_employee")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id_supplier" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "name" TEXT,
    "NIP" TEXT,
    "REGON" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id_supplier")
);

-- CreateTable
CREATE TABLE "Pallet" (
    "id_pallet" SERIAL NOT NULL,
    "id_supplier" INTEGER NOT NULL,
    "id_employee" INTEGER NOT NULL,
    "purchase_price" DOUBLE PRECISION NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pallet_pkey" PRIMARY KEY ("id_pallet")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Product" (
    "id_product" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "EAN" TEXT,
    "ASIN" TEXT,
    "description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "Product_Category" (
    "id_product_category" SERIAL NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "Product_Category_pkey" PRIMARY KEY ("id_product_category")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id_batch" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "id_condition" INTEGER NOT NULL,
    "id_pallet" INTEGER NOT NULL,
    "quantity_in_delivery" INTEGER NOT NULL,
    "quantity_in_stock" INTEGER NOT NULL,
    "purchase_price" DOUBLE PRECISION,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id_batch")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id_condition" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id_condition")
);

-- CreateTable
CREATE TABLE "Client" (
    "id_client" SERIAL NOT NULL,
    "id_user" INTEGER,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "company_name" TEXT,
    "NIP" TEXT,
    "REGON" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Order" (
    "id_order" SERIAL NOT NULL,
    "id_client" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "order_price" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "Batch_Order" (
    "id_batch_order" SERIAL NOT NULL,
    "id_batch" INTEGER NOT NULL,
    "id_order" INTEGER NOT NULL,
    "quantity_in_order" INTEGER NOT NULL,

    CONSTRAINT "Batch_Order_pkey" PRIMARY KEY ("id_batch_order")
);

-- CreateTable
CREATE TABLE "Order_Status" (
    "id_order_status" SERIAL NOT NULL,
    "id_status" INTEGER NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_employee" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "Order_Status_pkey" PRIMARY KEY ("id_order_status")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "Company"("id_company") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pallet" ADD CONSTRAINT "Pallet_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "Supplier"("id_supplier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pallet" ADD CONSTRAINT "Pallet_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id_employee") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Category" ADD CONSTRAINT "Product_Category_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Category" ADD CONSTRAINT "Product_Category_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_id_condition_fkey" FOREIGN KEY ("id_condition") REFERENCES "Condition"("id_condition") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_id_pallet_fkey" FOREIGN KEY ("id_pallet") REFERENCES "Pallet"("id_pallet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch_Order" ADD CONSTRAINT "Batch_Order_id_batch_fkey" FOREIGN KEY ("id_batch") REFERENCES "Batch"("id_batch") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch_Order" ADD CONSTRAINT "Batch_Order_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Status" ADD CONSTRAINT "Order_Status_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Status" ADD CONSTRAINT "Order_Status_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Status" ADD CONSTRAINT "Order_Status_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id_employee") ON DELETE RESTRICT ON UPDATE CASCADE;
