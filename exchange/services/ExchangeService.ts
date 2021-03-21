import { IExchangeServiceServer } from '../proto_build/exchange_grpc_pb'
import { ExchangeRequest, ExchangeResponse } from '../proto_build/exchange_pb'
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js"
import IEcbResponse from '../models/IEcbResponse'
import axios from "axios"
import { Status } from '@grpc/grpc-js/build/src/constants'
import { Symbol } from '../proto_build/users_pb'

const serverImpl: IExchangeServiceServer = {
  exchange(call: ServerUnaryCall<ExchangeRequest, ExchangeResponse>, callback: sendUnaryData<ExchangeResponse>): void {
    const [from, to, value] = [call.request.getFrom(), call.request.getTo(), call.request.getValue()]
    const fromString = from == Symbol.EUR ? "EUR": "USD"
    const toString = to == Symbol.USD ? "USD": "EUR" 
    const url = `https://api.exchangeratesapi.io/latest?base=${fromString}&symbols=${toString}`

    axios.get<IEcbResponse>(url)
      .then(res => {
        console.log(res)
        const { data } = res;
        const exchangeRate = data.rates[toString];
        if (!exchangeRate) {
          callback({ code: Status.NOT_FOUND })
        }

        const exchangeReponse = new ExchangeResponse()
        exchangeReponse.setValue(exchangeRate as number * value)
        callback(null, exchangeReponse)
      })
      .catch(err => {
        console.log(err)
        callback({ code: Status.INVALID_ARGUMENT })
      })
  }
}

export default serverImpl