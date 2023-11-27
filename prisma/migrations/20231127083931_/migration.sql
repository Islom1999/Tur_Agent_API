-- CreateEnum
CREATE TYPE "permissions" AS ENUM ('special_create', 'special_view', 'special_update', 'special_delete', 'product_create', 'product_view', 'product_update', 'product_delete', 'order_create', 'order_view', 'order_update', 'order_delete', 'user_create', 'user_view', 'user_update', 'user_delete', 'role_create', 'role_view', 'role_update', 'role_delete');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Personal', 'Group');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,
    "isBlock" BOOLEAN NOT NULL DEFAULT false,
    "role_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "permissions" "permissions"[] DEFAULT ARRAY['product_view']::"permissions"[],

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageName" TEXT NOT NULL,
    "unused" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "name_ne" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "description_en" TEXT,
    "description_ru" TEXT,
    "description_ne" TEXT,
    "description_id" TEXT,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "name_en" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "name_ne" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_ru" TEXT NOT NULL,
    "description_ne" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "map" TEXT NOT NULL,
    "county_id" TEXT NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packege" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "name_en" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "name_ne" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_ru" TEXT NOT NULL,
    "description_ne" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "notes_en" TEXT NOT NULL,
    "notes_ru" TEXT NOT NULL,
    "notes_ne" TEXT NOT NULL,
    "notes_id" TEXT NOT NULL,
    "price_en" TEXT NOT NULL,
    "price_ru" TEXT NOT NULL,
    "price_ne" TEXT NOT NULL,
    "price_id" TEXT NOT NULL,
    "duration_en" TEXT NOT NULL,
    "duration_ru" TEXT NOT NULL,
    "duration_ne" TEXT NOT NULL,
    "duration_id" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'Personal',
    "county_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,

    CONSTRAINT "packege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "name_ne" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_ru" TEXT NOT NULL,
    "description_ne" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "info_en" TEXT NOT NULL,
    "info_ru" TEXT NOT NULL,
    "info_ne" TEXT NOT NULL,
    "info_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "night" INTEGER NOT NULL DEFAULT 1,
    "hotel_en" TEXT NOT NULL,
    "hotel_ru" TEXT NOT NULL,
    "hotel_ne" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "name_en" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "name_ne" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_ru" TEXT NOT NULL,
    "description_ne" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "county_id" TEXT NOT NULL,

    CONSTRAINT "planning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "name_ne" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,

    CONSTRAINT "partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_title_key" ON "roles"("title");

-- CreateIndex
CREATE UNIQUE INDEX "images_imageName_key" ON "images"("imageName");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "region_county_id_fkey" FOREIGN KEY ("county_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packege" ADD CONSTRAINT "packege_county_id_fkey" FOREIGN KEY ("county_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packege" ADD CONSTRAINT "packege_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning" ADD CONSTRAINT "planning_county_id_fkey" FOREIGN KEY ("county_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
