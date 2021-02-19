
import  { Server, ServerCredentials } from "@grpc/grpc-js"
import { ExchangeServiceService } from "../proto_build/exchange_grpc_pb"
import ExchangeServer from '../services/ExchangeService'
 
export default function(host: string, port: number) {
  const server = new Server()
  server.addService(ExchangeServiceService, ExchangeServer)
  return server 
}