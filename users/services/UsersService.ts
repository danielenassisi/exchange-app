import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js"
import { IUsersServiceServer } from "../proto_build/users_grpc_pb"
import { BuyRequest, DepositRequest, ListTransactionsRequest, ListTransactionsResponse, LoginRequest, LoginResponse, SignupRequest, User, WithdrawRequest } from "../proto_build/users_pb"
import * as google_protobuf from "google-protobuf/google/protobuf/empty_pb"
import ISignupRequest from "../models/ISignupRequest"
import ILoginRequest from "../models/ILoginRequest"
import { addUser, getUserByEmail, getUserById } from "../repositories/UserRepository"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { compare } from "bcrypt"
import { User as DbUser, CurrentAccount } from "@prisma/client"
import { generateJwtToken } from "../utils/jwt"
import IDepositRequest from "../models/IDepositRequest"
import { createDeposit, createWithdraw } from "../repositories/CurrencyRepository"
import IWithdrawRequest from "../models/IWithdrawRequest"
import { getCurrentAccountBySymbol } from "../repositories/CurrentAccountRepository"

const serverImpl: IUsersServiceServer = {
  signup(call: ServerUnaryCall<SignupRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const signupRequest: ISignupRequest = {
      email: call.request.getEmail(),
      name: call.request.getName(),
      surname: call.request.getSurname(),
      password: call.request.getPassword(),
      iban: call.request.getIban()
    }

    try {
      const user = addUser(signupRequest)
      callback(null)
    } catch (e) {
      callback({ code: Status.INTERNAL })
    }

  },
  login(call: ServerUnaryCall<LoginRequest, LoginResponse>, callback: sendUnaryData<LoginResponse>): void {
    const loginRequest: ILoginRequest = { email: call.request.getEmail(), password: call.request.getPassword() }

    let dbuser: void | DbUser
    getUserByEmail(loginRequest.email)
      .then(user => {
        dbuser = user ?? callback({ code: Status.NOT_FOUND })
        return compare(loginRequest.password, (dbuser as DbUser).hashedPassword)
      })
      .catch(err => callback({ code: Status.INTERNAL }))
      .then(res => {

        if (!res) {
          callback({ code: Status.INVALID_ARGUMENT })
        }

        const token = generateJwtToken((dbuser as DbUser))

        const response = new LoginResponse()
        const responseUser = new User()

        responseUser.setId((dbuser as DbUser).id)
        responseUser.setEmail((dbuser as DbUser).email)
        responseUser.setIban((dbuser as DbUser).iban)
        responseUser.setName((dbuser as DbUser).name)
        responseUser.setSurname((dbuser as DbUser).surname)

        response.setToken(token)
        response.setUser(responseUser)

        callback(null, response)
      })
  },
  deposit(call: ServerUnaryCall<DepositRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const depositReq: IDepositRequest = { userId: call.request.getUserid(), value: call.request.getValue(), symbol: call.request.getSymbol() }

    getUserById(depositReq.userId)
      .then(u => {
        const user = u ?? callback({ code: Status.NOT_FOUND })
        return createDeposit(depositReq)
      })
      .catch(e => callback({ code: Status.INTERNAL }))
      .then(res => res ? callback(null) : callback({ code: Status.INTERNAL }))
      .catch(e => callback({ code: Status.INTERNAL }))
  },
  withdraw(call: ServerUnaryCall<WithdrawRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const withdrawReq: IWithdrawRequest = { userId: call.request.getUserid(), value: call.request.getValue(), symbol: call.request.getSymbol() }

    getCurrentAccountBySymbol(withdrawReq.userId, withdrawReq.symbol)
      .then(ca => {
        if (!ca) {
          callback({ code: Status.NOT_FOUND })
        }

        if (ca?.value.lt(withdrawReq.value)) {
          callback({ code: Status.INVALID_ARGUMENT })
        }

        return createWithdraw(withdrawReq)
      })
      .catch(e => callback({ code: Status.INTERNAL }))
      .then(res => res ? callback(null) : callback({ code: Status.NOT_FOUND }))
      .catch(e => callback({ code: Status.INTERNAL }))
  },
  buy(call: ServerUnaryCall<BuyRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void { },
  listTransactions(call: ServerUnaryCall<ListTransactionsRequest, ListTransactionsResponse>, callback: sendUnaryData<ListTransactionsResponse>): void { },
}


export default serverImpl