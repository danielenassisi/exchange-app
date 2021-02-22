
import  { Server, ServerCredentials } from "@grpc/grpc-js"
import { UsersServiceService } from "../proto_build/users_grpc_pb"
import UsersServer from '../services/UsersService'
 
export default function(host: string, port: number) {
  const server = new Server()
  server.addService(UsersServiceService, UsersServer)
  return server 
}