-- CreateTable
CREATE TABLE "Firma" (
    "id_firmy" SERIAL NOT NULL,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "NIP" TEXT NOT NULL,
    "REGON" TEXT,
    "telefon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numer_lokalu" TEXT NOT NULL,
    "numer_domu" TEXT NOT NULL,
    "ulica" TEXT NOT NULL,
    "kod_pocztowy" TEXT NOT NULL,
    "miasto" TEXT NOT NULL,
    "wojewodztwo" TEXT NOT NULL,
    "kraj" TEXT NOT NULL,

    CONSTRAINT "Firma_pkey" PRIMARY KEY ("id_firmy")
);

-- CreateTable
CREATE TABLE "Pracownik" (
    "id_pracownika" SERIAL NOT NULL,
    "id_firmy" INTEGER,
    "login" TEXT NOT NULL,
    "haslo" TEXT NOT NULL,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Pracownik_pkey" PRIMARY KEY ("id_pracownika")
);

-- CreateTable
CREATE TABLE "Dostawca" (
    "id_dostawcy" SERIAL NOT NULL,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "nazwa" TEXT,
    "NIP" TEXT,
    "REGON" TEXT,
    "telefon" TEXT,
    "email" TEXT,
    "numer_lokalu" TEXT,
    "numer_domu" TEXT,
    "ulica" TEXT,
    "kod_pocztowy" TEXT,
    "miasto" TEXT,
    "wojewodztwo" TEXT,
    "kraj" TEXT,

    CONSTRAINT "Dostawca_pkey" PRIMARY KEY ("id_dostawcy")
);

-- CreateTable
CREATE TABLE "Paleta" (
    "id_palety" SERIAL NOT NULL,
    "id_dostawcy" INTEGER NOT NULL,
    "id_pracownika" INTEGER NOT NULL,
    "cena_zakupu" DOUBLE PRECISION NOT NULL,
    "data_zakupu" TIMESTAMP(3) NOT NULL,
    "data_dostawy" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paleta_pkey" PRIMARY KEY ("id_palety")
);

-- CreateTable
CREATE TABLE "Kategoria" (
    "id_kategorii" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "opis" TEXT NOT NULL,

    CONSTRAINT "Kategoria_pkey" PRIMARY KEY ("id_kategorii")
);

-- CreateTable
CREATE TABLE "Produkt" (
    "id_produktu" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "EAN" TEXT,
    "ASIN" TEXT,
    "opis" TEXT,

    CONSTRAINT "Produkt_pkey" PRIMARY KEY ("id_produktu")
);

-- CreateTable
CREATE TABLE "Kategoria_Produktu" (
    "id_kategorii_produktu" SERIAL NOT NULL,
    "id_kategorii" INTEGER NOT NULL,
    "id_produktu" INTEGER NOT NULL,

    CONSTRAINT "Kategoria_Produktu_pkey" PRIMARY KEY ("id_kategorii_produktu")
);

-- CreateTable
CREATE TABLE "Partia" (
    "id_partii" SERIAL NOT NULL,
    "id_produktu" INTEGER NOT NULL,
    "liczba_dostawy" INTEGER NOT NULL,
    "liczba_magazynowa" INTEGER NOT NULL,
    "cena_zakupu" DOUBLE PRECISION,
    "cena_sprzedazy" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Partia_pkey" PRIMARY KEY ("id_partii")
);

-- CreateTable
CREATE TABLE "Stan" (
    "id_stanu" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "opis" TEXT NOT NULL,

    CONSTRAINT "Stan_pkey" PRIMARY KEY ("id_stanu")
);

-- CreateTable
CREATE TABLE "Partia_Stan" (
    "id_palety" SERIAL NOT NULL,
    "id_stanu" INTEGER NOT NULL,
    "id_partii" INTEGER NOT NULL,
    "opis" TEXT NOT NULL,

    CONSTRAINT "Partia_Stan_pkey" PRIMARY KEY ("id_palety")
);

-- CreateTable
CREATE TABLE "Klient" (
    "id_klienta" SERIAL NOT NULL,
    "id_konta_klienta" INTEGER NOT NULL,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "nazwa" TEXT,
    "NIP" TEXT,
    "REGON" TEXT,
    "telefon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numer_lokalu" TEXT NOT NULL,
    "numer_domu" TEXT NOT NULL,
    "ulica" TEXT NOT NULL,
    "kod_pocztowy" TEXT NOT NULL,
    "miasto" TEXT NOT NULL,
    "wojewodztwo" TEXT NOT NULL,
    "kraj" TEXT NOT NULL,

    CONSTRAINT "Klient_pkey" PRIMARY KEY ("id_klienta")
);

-- CreateTable
CREATE TABLE "Konto_Klienta" (
    "id_konta_klienta" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "haslo" TEXT NOT NULL,

    CONSTRAINT "Konto_Klienta_pkey" PRIMARY KEY ("id_konta_klienta")
);

-- CreateTable
CREATE TABLE "Zamowienie" (
    "id_zamowienia" SERIAL NOT NULL,
    "id_klienta" INTEGER NOT NULL,
    "data_zamowienia" TIMESTAMP(3) NOT NULL,
    "cena_zamowienia" DOUBLE PRECISION NOT NULL,
    "uwagi" TEXT,

    CONSTRAINT "Zamowienie_pkey" PRIMARY KEY ("id_zamowienia")
);

-- CreateTable
CREATE TABLE "Partia_Zamowienie" (
    "id_palety" SERIAL NOT NULL,
    "id_partii" INTEGER NOT NULL,
    "id_zamowienia" INTEGER NOT NULL,
    "Liczba" INTEGER NOT NULL,

    CONSTRAINT "Partia_Zamowienie_pkey" PRIMARY KEY ("id_palety")
);

-- CreateTable
CREATE TABLE "Status" (
    "id_statusu" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "opis" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id_statusu")
);

-- CreateTable
CREATE TABLE "Status_Zamowienia" (
    "id_statusu_zamowienia" SERIAL NOT NULL,
    "id_statusu" INTEGER NOT NULL,
    "id_zamowienia" INTEGER NOT NULL,
    "id_pracownika" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "Uwagi" TEXT,

    CONSTRAINT "Status_Zamowienia_pkey" PRIMARY KEY ("id_statusu_zamowienia")
);

-- AddForeignKey
ALTER TABLE "Pracownik" ADD CONSTRAINT "Pracownik_id_firmy_fkey" FOREIGN KEY ("id_firmy") REFERENCES "Firma"("id_firmy") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paleta" ADD CONSTRAINT "Paleta_id_dostawcy_fkey" FOREIGN KEY ("id_dostawcy") REFERENCES "Dostawca"("id_dostawcy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paleta" ADD CONSTRAINT "Paleta_id_pracownika_fkey" FOREIGN KEY ("id_pracownika") REFERENCES "Pracownik"("id_pracownika") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kategoria_Produktu" ADD CONSTRAINT "Kategoria_Produktu_id_kategorii_fkey" FOREIGN KEY ("id_kategorii") REFERENCES "Kategoria"("id_kategorii") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kategoria_Produktu" ADD CONSTRAINT "Kategoria_Produktu_id_produktu_fkey" FOREIGN KEY ("id_produktu") REFERENCES "Produkt"("id_produktu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partia" ADD CONSTRAINT "Partia_id_produktu_fkey" FOREIGN KEY ("id_produktu") REFERENCES "Produkt"("id_produktu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partia_Stan" ADD CONSTRAINT "Partia_Stan_id_stanu_fkey" FOREIGN KEY ("id_stanu") REFERENCES "Stan"("id_stanu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partia_Stan" ADD CONSTRAINT "Partia_Stan_id_partii_fkey" FOREIGN KEY ("id_partii") REFERENCES "Partia"("id_partii") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Klient" ADD CONSTRAINT "Klient_id_konta_klienta_fkey" FOREIGN KEY ("id_konta_klienta") REFERENCES "Konto_Klienta"("id_konta_klienta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zamowienie" ADD CONSTRAINT "Zamowienie_id_klienta_fkey" FOREIGN KEY ("id_klienta") REFERENCES "Klient"("id_klienta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partia_Zamowienie" ADD CONSTRAINT "Partia_Zamowienie_id_partii_fkey" FOREIGN KEY ("id_partii") REFERENCES "Partia"("id_partii") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partia_Zamowienie" ADD CONSTRAINT "Partia_Zamowienie_id_zamowienia_fkey" FOREIGN KEY ("id_zamowienia") REFERENCES "Zamowienie"("id_zamowienia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status_Zamowienia" ADD CONSTRAINT "Status_Zamowienia_id_statusu_fkey" FOREIGN KEY ("id_statusu") REFERENCES "Status"("id_statusu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status_Zamowienia" ADD CONSTRAINT "Status_Zamowienia_id_zamowienia_fkey" FOREIGN KEY ("id_zamowienia") REFERENCES "Zamowienie"("id_zamowienia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status_Zamowienia" ADD CONSTRAINT "Status_Zamowienia_id_pracownika_fkey" FOREIGN KEY ("id_pracownika") REFERENCES "Pracownik"("id_pracownika") ON DELETE RESTRICT ON UPDATE CASCADE;
