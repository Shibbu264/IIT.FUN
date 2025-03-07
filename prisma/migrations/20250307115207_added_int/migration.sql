/*
  Warnings:

  - You are about to alter the column `userId` on the `SocialAccount` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `UserBounty` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `accessToken` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
-- Step 1: Drop Foreign Key Constraints
ALTER TABLE "UserBounty" DROP CONSTRAINT "UserBounty_userId_fkey";
ALTER TABLE "SocialAccount" DROP CONSTRAINT "SocialAccount_userId_fkey";

-- Step 2: Convert BigInt to Int
ALTER TABLE "User" ALTER COLUMN "id" SET DATA TYPE INTEGER USING "id"::INTEGER;
ALTER TABLE "UserBounty" ALTER COLUMN "userId" SET DATA TYPE INTEGER USING "userId"::INTEGER;
ALTER TABLE "SocialAccount" ALTER COLUMN "userId" SET DATA TYPE INTEGER USING "userId"::INTEGER;

-- Step 3: Reapply Foreign Key Constraints
ALTER TABLE "UserBounty" 
ADD CONSTRAINT "UserBounty_userId_fkey" FOREIGN KEY ("userId") 
REFERENCES "User"("id") ON DELETE CASCADE;

ALTER TABLE "SocialAccount" 
ADD CONSTRAINT "SocialAccount_userId_fkey" FOREIGN KEY ("userId") 
REFERENCES "User"("id") ON DELETE CASCADE;

