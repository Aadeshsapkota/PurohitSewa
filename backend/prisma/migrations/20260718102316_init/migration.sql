-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "poojaType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "poojaTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);
