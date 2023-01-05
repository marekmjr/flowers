/*
  Warnings:

  - You are about to drop the column `maxHydration` on the `Flower` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currHydration" INTEGER NOT NULL
);
INSERT INTO "new_Flower" ("createdAt", "currHydration", "description", "id", "imgUrl", "name", "updatedAt") SELECT "createdAt", "currHydration", "description", "id", "imgUrl", "name", "updatedAt" FROM "Flower";
DROP TABLE "Flower";
ALTER TABLE "new_Flower" RENAME TO "Flower";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
