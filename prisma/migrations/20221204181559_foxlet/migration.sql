/*
  Warnings:

  - Made the column `id_firmy` on table `Pracownik` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Klient" DROP CONSTRAINT "Klient_id_uzytkownika_fkey";

-- DropForeignKey
ALTER TABLE "Pracownik" DROP CONSTRAINT "Pracownik_id_firmy_fkey";

-- AlterTable
ALTER TABLE "Klient" ALTER COLUMN "id_uzytkownika" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pracownik" ALTER COLUMN "id_firmy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pracownik" ADD CONSTRAINT "Pracownik_id_firmy_fkey" FOREIGN KEY ("id_firmy") REFERENCES "Firma"("id_firmy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Klient" ADD CONSTRAINT "Klient_id_uzytkownika_fkey" FOREIGN KEY ("id_uzytkownika") REFERENCES "Uzytkownik"("id_uzytkownika") ON DELETE SET NULL ON UPDATE CASCADE;
