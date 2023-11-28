-- AlterTable
ALTER TABLE "packege" ADD COLUMN     "region_id" TEXT;

-- AddForeignKey
ALTER TABLE "packege" ADD CONSTRAINT "packege_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
