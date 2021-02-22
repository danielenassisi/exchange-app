import { ServerUnaryCall } from "@grpc/grpc-js"
import { IUsersServiceServer } from "../proto_build/users_grpc_pb"
import { SignupRequest } from "../proto_build/users_pb"

const serverImpl: IUsersServiceServer = {
  signup(call: ServerUnaryCall<SignupRequest, google_protobuf_empty_pb.Empty>, callback: sendUnaryData<ExchangeResponse>): void {
    const [from, to, value] = [call.request.getFrom(), call.request.getTo(), call.request.getValue()]
    const url = `https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`
    axios.get<IEcbResponse>(url)
      .then(res => {
        const { data } = res;
        const exchangeRate = data.rates.get(to);
        
        if (!exchangeRate) {
          callback(null)
        }

        const exchangeReponse = new ExchangeResponse()
        exchangeReponse.setValue(exchangeRate as number * value)
        callback(null, exchangeReponse)
      })
      .catch(err => {
        console.log(err)
        callback(null)
      })
  }
}


export default serverImpl