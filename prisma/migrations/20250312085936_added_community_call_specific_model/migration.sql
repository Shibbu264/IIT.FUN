-- AlterTable
ALTER TABLE "UserBounty" ALTER COLUMN "pointsEarned" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CommunityCall" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "amount" INTEGER,
    "unit" TEXT,
    "Link" TEXT,
    "date" TEXT NOT NULL,

    CONSTRAINT "CommunityCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCommunityCall" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityCallId" INTEGER NOT NULL,
    "pointsEarned" INTEGER,
    "attended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserCommunityCall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCommunityCall_userId_communityCallId_key" ON "UserCommunityCall"("userId", "communityCallId");

-- AddForeignKey
ALTER TABLE "UserCommunityCall" ADD CONSTRAINT "UserCommunityCall_communityCallId_fkey" FOREIGN KEY ("communityCallId") REFERENCES "CommunityCall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommunityCall" ADD CONSTRAINT "UserCommunityCall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
