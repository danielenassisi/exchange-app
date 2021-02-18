import { IExchangeServiceServer } from '../proto_build/exchange_grpc_pb'
import { ExchangeRequest, ExchangeResponse } from '../proto_build/exchange_pb'
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js"
import { } from ""



const serverImpl: IExchangeServiceServer = {
  exchange(call: ServerUnaryCall<ExchangeRequest, ExchangeResponse>, callback: sendUnaryData<ExchangeResponse>): void {
    // callback(null, getSong());
  }
}

export default serverImpl