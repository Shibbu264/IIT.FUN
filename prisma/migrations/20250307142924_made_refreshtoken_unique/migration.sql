/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `SocialAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_refreshToken_key" ON "SocialAccount"("refreshToken");
