-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "mrp" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "availableStock" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EMIPlan" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "months" INTEGER NOT NULL,
    "interestRate" DECIMAL(5,2) NOT NULL,
    "monthlyPayment" INTEGER NOT NULL,
    "cashback" INTEGER NOT NULL DEFAULT 0,
    "provider" TEXT NOT NULL DEFAULT '1Fi Mutual Fund EMI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EMIPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_productId_color_storage_key" ON "Variant"("productId", "color", "storage");

-- CreateIndex
CREATE UNIQUE INDEX "EMIPlan_variantId_months_key" ON "EMIPlan"("variantId", "months");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMIPlan" ADD CONSTRAINT "EMIPlan_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
