-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "rep" TEXT NOT NULL DEFAULT 'AL',
    "source" TEXT NOT NULL DEFAULT 'LinkedIn',
    "stage" TEXT NOT NULL DEFAULT 'Lead Captured',
    "daysInStage" INTEGER NOT NULL DEFAULT 0,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "industry" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "website" TEXT,
    "industry" TEXT NOT NULL,
    "companyStage" TEXT NOT NULL,
    "monthlyRevenue" TEXT NOT NULL,
    "bottleneck" TEXT,
    "budgetRange" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
