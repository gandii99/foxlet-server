/*
  Warnings:

  - You are about to drop the column `ilosc_dostawy` on the `Partia` table. All the data in the column will be lost.
  - You are about to drop the column `ilosc_magazynowa` on the `Partia` table. All the data in the column will be lost.
  - You are about to drop the column `ilosc` on the `Partia_Zamowienie` table. All the data in the column will be lost.
  - You are about to drop the column `Uwagi` on the `Status_Zamowienia` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Status_Zamowienia` table. All the data in the column will be lost.
  - Added the required column `id_palety` to the `Partia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc_w_dostawie` to the `Partia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc_w_magazynie` to the `Partia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ilosc_w_zamowieniu` to the `Partia_Zamowienie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `znacznik_czasu` to the `Status_Zamowienia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partia" DROP COLUMN "ilosc_dostawy",
DROP COLUMN "ilosc_magazynowa",
ADD COLUMN     "id_palety" INTEGER NOT NULL,
ADD COLUMN     "ilosc_w_dostawie" INTEGER NOT NULL,
ADD COLUMN     "ilosc_w_magazynie" INTEGER NOT NULL,
ADD COLUMN     "opis" TEXT;

-- AlterTable
ALTER TABLE "Partia_Zamowienie" DROP COLUMN "ilosc",
ADD COLUMN     "ilosc_w_zamowieniu" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Status_Zamowienia" DROP COLUMN "Uwagi",
DROP COLUMN "data",
ADD COLUMN     "uwagi" TEXT,
ADD COLUMN     "znacznik_czasu" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Partia" ADD CONSTRAINT "Partia_id_palety_fkey" FOREIGN KEY ("id_palety") REFERENCES "Paleta"("id_palety") ON DELETE RESTRICT ON UPDATE CASCADE;
