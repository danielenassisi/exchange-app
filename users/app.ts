import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  while(true){}
}

main()
  .catch(e => {throw e})
  .finally(async () => {
    await prisma.$disconnect()
  })