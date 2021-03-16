import { sendUnaryData, ServerUnaryCall, status } from "@grpc/grpc-js"
import { IUsersServiceServer } from "../proto_build/users_grpc_pb"
import { BuyRequest, DepositRequest, ListTransactionsRequest, ListTransactionsResponse, LoginRequest, LoginResponse, SignupRequest, User, WithdrawRequest } from "../proto_build/users_pb"
import * as google_protobuf from "google-protobuf/google/protobuf/empty_pb"
import ISignupRequest from "../models/ISignupRequest"
import ILoginRequest from "../models/ILoginRequest"
import { addUser, getUserByEmail, getUserById } from "../repositories/UserRepository"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { compare } from "bcrypt"
import { User as DbUser, CurrencySymbol } from "@prisma/client"
import { generateJwtToken } from "../utils/jwt"
import IDepositRequest from "../models/IDepositRequest"
import { createBuy, createDeposit, createWithdraw } from "../repositories/CurrencyRepository"
import IWithdrawRequest from "../models/IWithdrawRequest"
import { getCurrentAccountBySymbol } from "../repositories/CurrentAccountRepository"
import IBuyRequest from "../models/IBuyRequest"
import { ExchangeService } from "./ExchangeService"
import { ServiceError } from "@grpc/grpc-js"

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
    const depositReq: IDepositRequest = { userId: call.request.getUserid(), value: call.request.getValue(), symbol: call.request.getSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD }

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
    const withdrawReq: IWithdrawRequest = { userId: call.request.getUserid(), value: call.request.getValue(), symbol: call.request.getSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD }

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
  buy(call: ServerUnaryCall<BuyRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const buyReq: IBuyRequest = {
      userId: call.request.getUserid(),
      fromSymbol: call.request.getFromSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD,
      toSymbol: call.request.getToSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD,
      value: call.request.getValue()
    }

    if (buyReq.fromSymbol === buyReq.toSymbol) {
      callback({ code: Status.INVALID_ARGUMENT })
    }
    

    const exchangeClient = new ExchangeService()

    exchangeClient.exchange(buyReq)
      .then(exchangeRes => {
        const value = exchangeRes.getValue()
        return createBuy(buyReq, value)
      })
      .catch(e => {
        const error = e as ServiceError
        callback(error)
      })
      .then(res => res ? callback(null) : callback({ code: Status.INVALID_ARGUMENT }))
      .catch(e => callback({ code: Status.INTERNAL }))
  },
  listTransactions(call: ServerUnaryCall<ListTransactionsRequest, ListTransactionsResponse>, callback: sendUnaryData<ListTransactionsResponse>): void { },
}


export default serverImpl