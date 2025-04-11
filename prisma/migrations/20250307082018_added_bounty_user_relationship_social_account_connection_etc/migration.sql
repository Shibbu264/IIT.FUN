/*
  Warnings:

  - Made the column `points` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "InstiId" BOOLEAN DEFAULT false,
ADD COLUMN     "discord" BOOLEAN DEFAULT false,
ADD COLUMN     "twitter" BOOLEAN DEFAULT false,
ALTER COLUMN "points" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserBounty" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "bountyId" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL,

    CONSTRAINT "UserBounty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialAccount" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "username" TEXT,
    "profileUrl" TEXT,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBounty_userId_bountyId_key" ON "UserBounty"("userId", "bountyId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_provider_providerId_key" ON "SocialAccount"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "UserBounty" ADD CONSTRAINT "UserBounty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBounty" ADD CONSTRAINT "UserBounty_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialAccount" ADD CONSTRAINT "SocialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
