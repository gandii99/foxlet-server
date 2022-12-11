/*
  Warnings:

  - You are about to drop the column `id_konta_klienta` on the `Klient` table. All the data in the column will be lost.
  - You are about to drop the column `liczba_dostawy` on the `Partia` table. All the data in the column will be lost.
  - You are about to drop the column `liczba_magazynowa` on the `Partia` table. All the data in the column will be lost.
  - You are about to drop the column `Liczba` on the `Partia_Zamowienie` table. All the data in the column will be lost.
  - You are about to drop the column `haslo` on the `Pracownik` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `Pracownik` table. All the data in the column will be lost.
  - You are about to drop the `Konto_Klienta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partia_Stan` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `numer_lokalu` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numer_domu` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ulica` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kod_pocztowy` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `miasto` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wojewodztwo` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kraj` on table `Dostawca` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_uzytkownika` to the `Klient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_stanu` to the `Partia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc_dostawy` to the `Partia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc_magazynowa` to the `Partia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc` to the `Partia_Zamowienie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PESEL` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_uzytkownika` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kod_pocztowy` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kraj` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `miasto` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numer_domu` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numer_lokalu` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulica` to the `Pracownik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wojewodztwo` to the `Pracownik` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Klient" DROP CONSTRAINT "Klient_id_konta_klienta_fkey";

-- DropForeignKey
ALTER TABLE "Partia_Stan" DROP CONSTRAINT "Partia_Stan_id_partii_fkey";

-- DropForeignKey
ALTER TABLE "Partia_Stan" DROP CONSTRAINT "Partia_Stan_id_stanu_fkey";

-- AlterTable
ALTER TABLE "Dostawca" ALTER COLUMN "numer_lokalu" SET NOT NULL,
ALTER COLUMN "numer_domu" SET NOT NULL,
ALTER COLUMN "ulica" SET NOT NULL,
ALTER COLUMN "kod_pocztowy" SET NOT NULL,
ALTER COLUMN "miasto" SET NOT NULL,
ALTER COLUMN "wojewodztwo" SET NOT NULL,
ALTER COLUMN "kraj" SET NOT NULL;

-- AlterTable
ALTER TABLE "Klient" DROP COLUMN "id_konta_klienta",
ADD COLUMN     "id_uzytkownika" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Partia" DROP COLUMN "liczba_dostawy",
DROP COLUMN "liczba_magazynowa",
ADD COLUMN     "id_stanu" INTEGER NOT NULL,
ADD COLUMN     "ilosc_dostawy" INTEGER NOT NULL,
ADD COLUMN     "ilosc_magazynowa" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Partia_Zamowienie" DROP COLUMN "Liczba",
ADD COLUMN     "ilosc" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pracownik" DROP COLUMN "haslo",
DROP COLUMN "login",
ADD COLUMN     "PESEL" TEXT NOT NULL,
ADD COLUMN     "id_uzytkownika" INTEGER NOT NULL,
ADD COLUMN     "kod_pocztowy" TEXT NOT NULL,
ADD COLUMN     "kraj" TEXT NOT NULL,
ADD COLUMN     "miasto" TEXT NOT NULL,
ADD COLUMN     "numer_domu" TEXT NOT NULL,
ADD COLUMN     "numer_lokalu" TEXT NOT NULL,
ADD COLUMN     "ulica" TEXT NOT NULL,
ADD COLUMN     "wojewodztwo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Konto_Klienta";

-- DropTable
DROP TABLE "Partia_Stan";

-- CreateTable
CREATE TABLE "Uzytkownik" (
    "id_uzytkownika" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "haslo" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "rola" TEXT NOT NULL,

    CONSTRAINT "Uzytkownik_pkey" PRIMARY KEY ("id_uzytkownika")
);

-- AddForeignKey
ALTER TABLE "Pracownik" ADD CONSTRAINT "Pracownik_id_uzytkownika_fkey" FOREIGN KEY ("id_uzytkownika") REFERENCES "Uzytkownik"("id_uzytkownika") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partia" ADD CONSTRAINT "Partia_id_stanu_fkey" FOREIGN KEY ("id_stanu") REFERENCES "Stan"("id_stanu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Klient" ADD CONSTRAINT "Klient_id_uzytkownika_fkey" FOREIGN KEY ("id_uzytkownika") REFERENCES "Uzytkownik"("id_uzytkownika") ON DELETE RESTRICT ON UPDATE CASCADE;
