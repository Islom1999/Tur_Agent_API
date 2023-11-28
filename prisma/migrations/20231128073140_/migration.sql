-- DropForeignKey
ALTER TABLE "region" DROP CONSTRAINT "region_country_id_fkey";

-- AlterTable
ALTER TABLE "region" ALTER COLUMN "country_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "region_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
