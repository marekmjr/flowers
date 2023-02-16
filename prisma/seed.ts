import { PrismaClient } from '@prisma/client'

import flowersDataSeed from './flowerDataSeed.json'
const prisma = new PrismaClient()
async function main() {
  flowersDataSeed.map(async flowerData => {
    await prisma.flowerDatabase.create({
      data: {
        id: flowerData.id,
        latin: flowerData.latin,
        family: flowerData.family,
        common: flowerData.common[0] || 'Not known',
        category: flowerData.category,
        origin: flowerData.origin,
        climate: flowerData.climate,
        tempmax: flowerData.tempmax.celsius,
        tempmin: flowerData.tempmin.celsius,
        ideallight: flowerData.ideallight,
        toleratedlight: flowerData.toleratedlight,
        watering: flowerData.watering
      }
  })
})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })