/*
  Warnings:

  - You are about to drop the column `county_id` on the `planning` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `planning` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "planning" DROP CONSTRAINT "planning_county_id_fkey";

-- AlterTable
ALTER TABLE "planning" DROP COLUMN "county_id",
ADD COLUMN     "country_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "planning" ADD CONSTRAINT "planning_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
