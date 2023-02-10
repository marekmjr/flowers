/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Flower` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flower" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coordinateX" REAL NOT NULL DEFAULT 0,
    "coordinateY" REAL NOT NULL DEFAULT 0,
    "howOftenToWaterInHours" INTEGER NOT NULL DEFAULT 24,
    "dateOfLastWatering" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Flower" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Flower";
DROP TABLE "Flower";
ALTER TABLE "new_Flower" RENAME TO "Flower";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
