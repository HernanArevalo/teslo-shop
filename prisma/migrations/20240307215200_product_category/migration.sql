-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('men', 'women', 'kids', 'unisex');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prduct" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inStock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sizes" "Size"[] DEFAULT ARRAY[]::"Size"[],
    "slug" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gender" "Gender" NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Prduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Prduct_slug_key" ON "Prduct"("slug");

-- CreateIndex
CREATE INDEX "Prduct_gender_idx" ON "Prduct"("gender");

-- AddForeignKey
ALTER TABLE "Prduct" ADD CONSTRAINT "Prduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
