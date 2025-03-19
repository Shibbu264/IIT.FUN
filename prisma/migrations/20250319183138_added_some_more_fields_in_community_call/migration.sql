-- AlterTable
ALTER TABLE "CommunityCall" ADD COLUMN     "meetlink" TEXT,
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT true;
