/*
  Warnings:

  - You are about to drop the column `region_id` on the `packege` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "packege" DROP CONSTRAINT "packege_region_id_fkey";

-- AlterTable
ALTER TABLE "packege" DROP COLUMN "region_id";
