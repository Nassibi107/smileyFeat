-- CreateTable
CREATE TABLE "SiteContent" (
  "id" INTEGER NOT NULL,
  "heroTitle" TEXT NOT NULL,
  "heroSubtitle" TEXT NOT NULL,
  "aboutTitle" TEXT NOT NULL,
  "aboutParagraph" TEXT NOT NULL,
  "aboutHighlights" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "specialty" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "imageUrl" TEXT,
  "color" TEXT NOT NULL DEFAULT '#7A5CFF',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);
