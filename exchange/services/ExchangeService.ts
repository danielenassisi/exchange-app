import { IExchangeServiceServer } from '../proto_build/exchange_grpc_pb'
import { ExchangeRequest, ExchangeResponse } from '../proto_build/exchange_pb'
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js"
import IEcbResponse from '../models/IEcbResponse'
import axios from "axios"
import { Status } from '@grpc/grpc-js/build/src/constants'

const serverImpl: IExchangeServiceServer = {
  exchange(call: ServerUnaryCall<ExchangeRequest, ExchangeResponse>, callback: sendUnaryData<ExchangeResponse>): void {
    const [from, to, value] = [call.request.getFrom(), call.request.getTo(), call.request.getValue()]
    const url = `https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`
    axios.get<IEcbResponse>(url)
      .then(res => {
        const { data } = res;
        const exchangeRate = data.rates.get(to);
        
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