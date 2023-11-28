/*
  Warnings:

  - You are about to drop the column `county_id` on the `packege` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `packege` table without a default value. This is not possible if the table is not empty.
  - Made the column `country_id` on table `region` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "packege" DROP CONSTRAINT "packege_county_id_fkey";

-- DropForeignKey
ALTER TABLE "region" DROP CONSTRAINT "region_country_id_fkey";

-- AlterTable
ALTER TABLE "packege" DROP COLUMN "county_id",
ADD COLUMN     "country_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "region" ALTER COLUMN "country_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "region_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packege" ADD CONSTRAINT "packege_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
