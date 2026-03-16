-- CreateTable
CREATE TABLE "DeliveryClient" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "owner" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Active',
  "health" TEXT NOT NULL DEFAULT 'Healthy',
  "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "progress" INTEGER NOT NULL DEFAULT 0,
  "contract" INTEGER NOT NULL DEFAULT 0,
  "services" JSONB NOT NULL,
  "team" JSONB NOT NULL,
  "stage" INTEGER NOT NULL DEFAULT 0,
  "tasks" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DeliveryClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freelancer" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "initials" TEXT NOT NULL,
  "specialization" TEXT NOT NULL,
  "rating" INTEGER NOT NULL DEFAULT 4,
  "rate" INTEGER NOT NULL DEFAULT 0,
  "availability" TEXT NOT NULL DEFAULT 'green',
  "activeProjects" INTEGER NOT NULL DEFAULT 0,
  "utilization" INTEGER NOT NULL DEFAULT 0,
  "profile" TEXT NOT NULL,
  "projects" JSONB NOT NULL,
  "tasks" JSONB NOT NULL,
  "payments" JSONB NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Freelancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "website" TEXT,
  "logoUrl" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialRecord" (
  "id" SERIAL NOT NULL,
  "month" TEXT NOT NULL,
  "clientName" TEXT NOT NULL,
  "contract" INTEGER NOT NULL DEFAULT 0,
  "freelancerCost" INTEGER NOT NULL DEFAULT 0,
  "opCost" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'Healthy',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "FinancialRecord_pkey" PRIMARY KEY ("id")
);
