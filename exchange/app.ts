import { ServerCredentials } from '@grpc/grpc-js'
import makeServer from './utils/exchangeServerFactory'

const HOST = "0.0.0.0"
const PORT = 9000

// TODO: implemetare gestione errori
// TODO: aggiungere i log su file

const server = makeServer(HOST, PORT)

server.bindAsync(`${HOST}:${PORT}`, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.log(err)
    server.forceShutdown()
  }

  server.start()
})