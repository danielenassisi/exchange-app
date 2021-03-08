import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js"
import { IUsersServiceServer } from "../proto_build/users_grpc_pb"
import { BuyRequest, DepositRequest, ListTransactionsRequest, ListTransactionsResponse, LoginRequest, LoginResponse, SignupRequest, WithdrawRequest } from "../proto_build/users_pb"
import * as google_protobuf from "google-protobuf/google/protobuf/empty_pb"
import ISignupRequest from "../models/ISignupRequest"
import { addUser } from "../repositories/UserRepository"
import { Status } from "@grpc/grpc-js/build/src/constants"

const serverImpl: IUsersServiceServer = {
  signup(call: ServerUnaryCall<SignupRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const signupRequest: ISignupRequest = {
      email: call.request.getEmail(),
      name: call.request.getName(),
      surname: call.request.getSurname(),
      password: call.request.getPassword(),
      iban: call.request.getIban() 
    }

    const user = addUser(signupRequest)

    if (!user) {
      callback({ code: Status.INTERNAL })
    }

    callback(null)
  },
  login(call: ServerUnaryCall<LoginRequest, LoginResponse>, callback: sendUnaryData<LoginResponse>): void {},
  deposit(call: ServerUnaryCall<DepositRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {},
  withdraw(call: ServerUnaryCall<WithdrawRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {},
  buy(call: ServerUnaryCall<BuyRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {},
  listTransactions(call: ServerUnaryCall<ListTransactionsRequest, ListTransactionsResponse>, callback: sendUnaryData<ListTransactionsResponse>): void {},
}


export default serverImpl