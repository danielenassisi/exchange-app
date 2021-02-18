
import  * as grpc from "@grpc/grpc-js"
import { ExchangeServiceService, IExchangeServiceServer } from "../proto_build/exchange_grpc_pb"
import ExchangeServer from '../services/ExchangeService'
 
export default function() {
  const server = new grpc.Server()

  server.addService(ExchangeServiceService, new ExchangeServer())

}