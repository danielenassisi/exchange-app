import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js"
import { IUsersServiceServer } from "../proto_build/users_grpc_pb"
import { BuyRequest, BuyResponse, DepositRequest, ListTransactionsRequest, ListTransactionsResponse, LoginRequest, LoginResponse, MeRequest, SignupRequest, Symbol, User, WithdrawRequest } from "../proto_build/users_pb"
import * as google_protobuf from "google-protobuf/google/protobuf/empty_pb"
import ISignupRequest from "../models/ISignupRequest"
import ILoginRequest from "../models/ILoginRequest"
import { addUser, getUserByEmail, getUserById } from "../repositories/UserRepository"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { User as DbUser, CurrencySymbol } from "@prisma/client"
import { generateJwtToken, verifyToken } from "../utils/jwt"
import IDepositRequest from "../models/IDepositRequest"
import { createBuy, createDeposit, createWithdraw } from "../repositories/CurrencyRepository"
import IWithdrawRequest from "../models/IWithdrawRequest"
import { getCurrentAccountBySymbol } from "../repositories/CurrentAccountRepository"
import IBuyRequest from "../models/IBuyRequest"
import { ExchangeService } from "./ExchangeService"
import { ServiceError } from "@grpc/grpc-js"
import { comparePassword } from "../utils/passwordHasher"
import { PrismaClientInitializationError } from "@prisma/client/runtime"

const serverImpl: IUsersServiceServer = {
  signup(call: ServerUnaryCall<SignupRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const signupRequest: ISignupRequest = {
      email: call.request.getEmail(),
      name: call.request.getName(),
      surname: call.request.getSurname(),
      password: call.request.getPassword(),
      iban: call.request.getIban()
    }
    addUser(signupRequest)
      .then(() => callback(null, new google_protobuf.Empty()))
      .catch((e: ServiceError) => {
        callback(e)
      })
  },
  login(call: ServerUnaryCall<LoginRequest, LoginResponse>, callback: sendUnaryData<LoginResponse>): void {
    const loginRequest: ILoginRequest = { email: call.request.getEmail(), password: call.request.getPassword() }

    let dbuser: DbUser
    getUserByEmail(loginRequest.email)
      .then(user => {
        dbuser = user
        return comparePassword(loginRequest.password, dbuser.hashedPassword)
      })
      .then(res => {

        if (!res) {
          return Promise.reject({ code: Status.INVALID_ARGUMENT } as ServiceError)
        }
        const token = generateJwtToken(dbuser)

        const response = new LoginResponse()
        const responseUser = new User()

        responseUser.setId(dbuser.id)
        responseUser.setEmail(dbuser.email)
        responseUser.setIban(dbuser.iban)
        responseUser.setName(dbuser.name)
        responseUser.setSurname(dbuser.surname)

        response.setToken(token)
        response.setUser(responseUser)

        callback(null, response)
      })
      .catch((e: ServiceError) => {
        callback(e)
      })
  },
  me(call: ServerUnaryCall<MeRequest, User>, callback: sendUnaryData<User>): void {
    const token = call.request.getToken()
    try {
      const decodedToken = verifyToken(token)

      getUserById(decodedToken.jti)
        .then(user => {
          const resUser = new User()

          const { id, email, name, surname, iban} = user
          resUser.setId(id)
          resUser.setEmail(email)
          resUser.setSurname(surname)
          resUser.setName(name)
          resUser.setIban(iban)

          callback(null, resUser)
        })
        .catch((e: ServiceError) => callback(e))
    } catch(e) {
      callback(e)
    }
    
  },
  deposit(call: ServerUnaryCall<DepositRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const depositReq: IDepositRequest = { userId: call.request.getUserid(), value: call.request.getValue(), symbol: call.request.getSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD }

    getUserById(depositReq.userId)
      .then(u => createDeposit(depositReq))
      .then(res => callback(null, new google_protobuf.Empty()))
      .catch((e: ServiceError) => callback(e))
  },
  withdraw(call: ServerUnaryCall<WithdrawRequest, google_protobuf.Empty>, callback: sendUnaryData<google_protobuf.Empty>): void {
    const withdrawReq: IWithdrawRequest = { userId: call.request.getUserid(), value: call.request.getValue(), symbol: call.request.getSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD }

    getCurrentAccountBySymbol(withdrawReq.userId, withdrawReq.symbol)
      .then(ca => {
        if (ca.value.lt(withdrawReq.value)) {
          return Promise.reject({ code: Status.INVALID_ARGUMENT } as ServiceError)
        }
        return createWithdraw(withdrawReq)
      })
      .then(res => callback(null, new google_protobuf.Empty()))
      .catch((e: ServiceError) => callback(e))
  },
  buy(call: ServerUnaryCall<BuyRequest, BuyResponse>, callback: sendUnaryData<BuyResponse>): void {
    const buyReq: IBuyRequest = {
      userId: call.request.getUserid(),
      fromSymbol: call.request.getFromSymbol() == 0 ? CurrencySymbol.EUR : CurrencySymbol.USD,
      value: call.request.getValue()
    }

    const exchangeClient = new ExchangeService()
    let value: number
    exchangeClient.exchange(buyReq)
      .then(exchangeRes => {
        value = exchangeRes.getValue()
        return createBuy(buyReq, value)
      })
      .then(res => {
        const buyRes = new BuyResponse()

        buyRes.setToSymbol(call.request.getFromSymbol() == Symbol.EUR ? Symbol.USD : Symbol.EUR)
        buyRes.setValue(value)

        callback(null, buyRes)
      })
      .catch((e: ServiceError | PrismaClientInitializationError) => {
        console.log(e)
        if (e instanceof PrismaClientInitializationError) {
          callback({ code: Status.INTERNAL })
        } else {
          callback(e)
        }
      })
  },
  listTransactions(call: ServerUnaryCall<ListTransactionsRequest, ListTransactionsResponse>, callback: sendUnaryData<ListTransactionsResponse>): void { },
}


export default serverImpl