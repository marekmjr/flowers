-- CreateTable
CREATE TABLE "FlowerDatabase" (
    "id" INTEGER NOT NULL,
    "latin" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "common" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "tempmax" REAL NOT NULL,
    "tempmin" REAL NOT NULL,
    "ideallight" TEXT NOT NULL,
    "toleratedlight" TEXT NOT NULL,
    "watering" TEXT NOT NULL
);

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
    "howOftenToWaterInDays" INTEGER NOT NULL DEFAULT 2,
    "dateOfLastWatering" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minTemperature" REAL NOT NULL DEFAULT 0,
    "maxTemperature" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Flower" ("coordinateX", "coordinateY", "createdAt", "dateOfLastWatering", "description", "howOftenToWaterInDays", "id", "name", "updatedAt") SELECT "coordinateX", "coordinateY", "createdAt", "dateOfLastWatering", "description", "howOftenToWaterInDays", "id", "name", "updatedAt" FROM "Flower";
DROP TABLE "Flower";
ALTER TABLE "new_Flower" RENAME TO "Flower";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "FlowerDatabase_id_key" ON "FlowerDatabase"("id");
