import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js"
import { IUsersServiceServer } from "../proto_build/users_grpc_pb"
import { BuyRequest, BuyResponse, DepositRequest, ListTransactionsRequest, ListTransactionsResponse, LoginRequest, LoginResponse, MeRequest, SignupRequest, Symbol, Transaction, User, WithdrawRequest, Operation as GrpcOperation, CurrentAccount } from "../proto_build/users_pb"
import * as google_protobuf from "google-protobuf/google/protobuf/empty_pb"
import ISignupRequest from "../models/ISignupRequest"
import ILoginRequest from "../models/ILoginRequest"
import { addUser, getUserByEmail, getUserById } from "../repositories/UserRepository"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { User as DbUser, CurrencySymbol, Operation, CurrentAccount as DbCurrentAccount } from "@prisma/client"
import { generateJwtToken, verifyToken } from "../utils/jwt"
import IDepositRequest from "../models/IDepositRequest"
import { createBuy, createDeposit, createWithdraw, getTransactions } from "../repositories/TransactionsRepository"
import IWithdrawRequest from "../models/IWithdrawRequest"
import { getCurrentAccountBySymbol } from "../repositories/CurrentAccountRepository"
import IBuyRequest from "../models/IBuyRequest"
import { ExchangeService } from "./ExchangeService"
import { ServiceError } from "@grpc/grpc-js"
import { comparePassword } from "../utils/passwordHasher"
import { PrismaClientInitializationError } from "@prisma/client/runtime"
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb"

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

    let dbuser: DbUser & { currentAccounts: DbCurrentAccount[] }
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

        const eurCurrentAccount = dbuser.currentAccounts.find(ca => ca.symbol == CurrencySymbol.EUR)
        const usdCurrentAccount = dbuser.currentAccounts.find(ca => ca.symbol == CurrencySymbol.USD)


        if (eurCurrentAccount) {
          const eurCaRes = new CurrentAccount()

          eurCaRes.setId(eurCurrentAccount.id)
          eurCaRes.setValue(eurCurrentAccount.value.toNumber())
          eurCaRes.setSymbol(Symbol.EUR)
          responseUser.setEurcurrentaccount(eurCaRes)
        }

        if (usdCurrentAccount) {
          const usdCaRes = new CurrentAccount()

          usdCaRes.setId(usdCurrentAccount.id)
          usdCaRes.setValue(usdCurrentAccount.value.toNumber())
          usdCaRes.setSymbol(Symbol.USD)
          responseUser.setUsdcurrentaccount(usdCaRes)
        }

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
          console.log(user)
          const resUser = new User()

          const { id, email, name, surname, iban, currentAccounts } = user

          const eurCurrentAccount = currentAccounts.find(ca => ca.symbol == CurrencySymbol.EUR)
          const usdCurrentAccount = currentAccounts.find(ca => ca.symbol == CurrencySymbol.USD)


          if (eurCurrentAccount) {
            const eurCaRes = new CurrentAccount()

            eurCaRes.setId(eurCurrentAccount.id)
            eurCaRes.setValue(eurCurrentAccount.value.toNumber())
            eurCaRes.setSymbol(Symbol.EUR)
            resUser.setEurcurrentaccount(eurCaRes)
          }

          if (usdCurrentAccount) {
            const usdCaRes = new CurrentAccount()

            usdCaRes.setId(usdCurrentAccount.id)
            usdCaRes.setValue(usdCurrentAccount.value.toNumber())
            usdCaRes.setSymbol(Symbol.USD)
            resUser.setUsdcurrentaccount(usdCaRes)
          }


          resUser.setId(id)
          resUser.setEmail(email)
          resUser.setSurname(surname)
          resUser.setName(name)
          resUser.setIban(iban)

          console.log(resUser)


          callback(null, resUser)
        })
        .catch((e: ServiceError) => callback(e))
    } catch (e) {
      console.log("CIAO")
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
  listTransactions(call: ServerUnaryCall<ListTransactionsRequest, ListTransactionsResponse>, callback: sendUnaryData<ListTransactionsResponse>): void {
    const [userId, dates, currencies] = [
      call.request.getUserid(),
      call.request.getDateList().map(date => date.toDate()),
      call.request.getCurrencyList().map(currency => currency == Symbol.EUR ? CurrencySymbol.EUR : CurrencySymbol.USD)
    ]
    console.log(userId)
    console.log(dates)
    console.log(currencies)

    getTransactions(userId, dates, currencies)
      .then(transactions => {
        const response = new ListTransactionsResponse()
        response.setTransactionsList(transactions.map(tr => {
          const grpcTransaction = new Transaction()
          const timestamp = new Timestamp()
          timestamp.fromDate(tr.date)

          let operation: GrpcOperation;

          if (tr.operation == Operation.BUY_DEPOSIT)
            operation = GrpcOperation.BUY_DEPOSIT
          else if (tr.operation == Operation.BUY_WITHDRAW)
            operation = GrpcOperation.BUY_WITHDRAW
          else if (tr.operation == Operation.DEPOSIT)
            operation = GrpcOperation.DEPOSIT
          else
            operation = GrpcOperation.WITHDRAW

          grpcTransaction.setId(tr.id)
          grpcTransaction.setDate(timestamp)
          grpcTransaction.setSymbol(tr.symbol == CurrencySymbol.EUR ? Symbol.EUR : Symbol.USD)
          grpcTransaction.setValue(tr.value.toNumber())
          grpcTransaction.setOperation(operation)

          return grpcTransaction
        }))
        callback(null, response)
      })
      .catch((e: ServiceError) => callback(e))
  },
}


export default serverImpl