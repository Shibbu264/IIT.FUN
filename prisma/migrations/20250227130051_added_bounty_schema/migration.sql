-- CreateTable
CREATE TABLE "Bounty" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "Link" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);
