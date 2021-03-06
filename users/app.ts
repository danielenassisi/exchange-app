import { ServerCredentials } from "@grpc/grpc-js"
import { prisma } from "./utils/prisma"
import { config } from "dotenv"
import makeServer from './utils/exchangeServerFactory'

const HOST = "0.0.0.0"
const PORT = 9001

config()

const usersGrpcServer = makeServer(HOST, PORT)

async function main() {
  usersGrpcServer.bindAsync(`${HOST}:${PORT}`, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.log(err)
      usersGrpcServer.forceShutdown()
    }
  
    usersGrpcServer.start()
  })
}

main()
  .catch(e => {console.log(e)})
  .finally(async () => {
    await prisma.$disconnect()
  })