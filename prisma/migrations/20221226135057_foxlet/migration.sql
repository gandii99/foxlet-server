/*
  Warnings:

  - A unique constraint covering the columns `[NIP]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[REGON]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_NIP_key" ON "Company"("NIP");

-- CreateIndex
CREATE UNIQUE INDEX "Company_REGON_key" ON "Company"("REGON");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
