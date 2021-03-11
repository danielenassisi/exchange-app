import { ExchangeServiceClient } from "../proto_build/exchange_grpc_pb"
import { ExchangeRequest, ExchangeResponse } from "../proto_build/exchange_pb"
import { ChannelCredentials, ServiceError } from "@grpc/grpc-js"
import { CurrencySymbol } from "@prisma/client"
import IBuyRequest from "../models/IBuyRequest"

export class ExchangeService {
  private static ADDRESS = "exchange:9000"
  private static client = new ExchangeServiceClient(ExchangeService.ADDRESS, ChannelCredentials.createInsecure()) 

  async exchange(buyRequest: IBuyRequest) {
    const { fromSymbol, toSymbol, value } = buyRequest
    const request = new ExchangeRequest()

    request.setFrom(fromSymbol == CurrencySymbol.EUR ? 0 : 1)
    request.setTo(toSymbol == CurrencySymbol.EUR ? 0 : 1)
    request.setValue(value)

    try {
      const res: ExchangeResponse = await new Promise((resolve, reject) => {
        ExchangeService.client.exchange(request, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })

      return res
    } catch(err) {
      throw err      
    }
  }
}