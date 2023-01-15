-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "user_name" SET DEFAULT 'Użytkownik',
ALTER COLUMN "avatar" DROP DEFAULT;
