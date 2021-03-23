import { ISignupViewModel } from "../models/users/signup/ISignupViewModel"
import { ILoginViewModel } from "../models/users/login/ILoginViewModel"
import { UsersServiceClient } from "../proto_build/users_grpc_pb"
import { SignupRequest, LoginRequest, LoginResponse, MeRequest, User, DepositRequest, Symbol, WithdrawRequest, BuyRequest, BuyResponse, ListTransactionsRequest, Transaction, ListTransactionsResponse, Operation } from "../proto_build/users_pb"
import { ChannelCredentials, ServiceError } from "@grpc/grpc-js"
import { response } from "express"
import { IDepositViewModel } from "../models/transactions/deposit/IDepositViewModel"
import { IWithdrawViewModel } from "../models/transactions/withdraw/IWithdrawViewModel"
import { IBuyViewModel } from "../models/transactions/buy/IBuyViewModel"
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb"
import { TransactionType } from "../models/transactions/TransactionType"

export class UsersService {
  private static ADDRESS = "users:9001"
  private static client = new UsersServiceClient(UsersService.ADDRESS, ChannelCredentials.createInsecure())

  async signup(signupViewModel: ISignupViewModel) {
    const { email, name, surname, iban, password } = signupViewModel
    const request = new SignupRequest()

    request.setEmail(email)
    request.setIban(iban)
    request.setName(name)
    request.setSurname(surname)
    request.setPassword(password)

    try {
      const signupUser = await new Promise((resolve, reject) => {
        UsersService.client.signup(request, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })
    } catch (err) {
      return false
    }


    return true
  }

  async login({ email, password }: ILoginViewModel) {
    const request = new LoginRequest()

    request.setEmail(email)
    request.setPassword(password)

    try {
      const loginRes: LoginResponse = await new Promise((resolve, reject) => {
        UsersService.client.login(request, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })
      const user = loginRes.getUser()
      let eurCurrentAccount: object, usdCurrentAccount: object
      if (user.getEurcurrentaccount()) {
        eurCurrentAccount = {
          id: user.getEurcurrentaccount().getId(),
          value: user.getEurcurrentaccount().getValue(),
          symbol: "EUR"
        }
      }

      if (user.getUsdcurrentaccount()) {
        usdCurrentAccount = {
          id: user.getEurcurrentaccount().getId(),
          value: user.getEurcurrentaccount().getValue(),
          symbol: "USD"
        }
      }

      return {
        token: loginRes.getToken(),
        user: {
          id: user.getId(),
          name: user.getName(),
          surname: user.getSurname(),
          email: user.getEmail(),
          iban: user.getIban(),
          eurCurrentAccount,
          usdCurrentAccount
        }
      }
    } catch (err) {
      throw err
    }
  }

  async me(token: string) {
    const request = new MeRequest()

    request.setToken(token)

    try {
      const user: User = await new Promise((resolve, reject) => {
        UsersService.client.me(request, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })

      console.log(user)

      let eurCurrentAccount: object, usdCurrentAccount: object
      if (user.getEurcurrentaccount()) {
        eurCurrentAccount = {
          id: user.getEurcurrentaccount().getId(),
          value: user.getEurcurrentaccount().getValue(),
          symbol: "EUR",
        }
      }

      if (user.getUsdcurrentaccount()) {
        usdCurrentAccount = {
          id: user.getUsdcurrentaccount().getId(),
          value: user.getUsdcurrentaccount().getValue(),
          symbol: "USD"
        }
      }

      return {
        id: user.getId(),
        name: user.getName(),
        surname: user.getSurname(),
        email: user.getEmail(),
        iban: user.getIban(),
        eurCurrentAccount,
        usdCurrentAccount
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async deposit(depositViewModel: IDepositViewModel, userId: string) {
    const request = new DepositRequest()

    request.setUserid(userId)
    request.setValue(depositViewModel.value)
    request.setSymbol(depositViewModel.symbol == "EUR" ? Symbol.EUR : Symbol.USD)

    try {
      const deposit = await new Promise((resolve, reject) => {
        UsersService.client.deposit(request, (error, res) => {
          if (error) reject(error)
          else resolve(res)
        })
      })
    } catch (err) {
      throw err as ServiceError
    }

    return true
  }

  async withdraw(withdrawViewModel: IWithdrawViewModel, userId: string) {
    const request = new WithdrawRequest()

    request.setUserid(userId)
    request.setValue(withdrawViewModel.value)
    request.setSymbol(withdrawViewModel.symbol == "EUR" ? Symbol.EUR : Symbol.USD)

    try {
      const withdraw = await new Promise((resolve, reject) => {
        UsersService.client.withdraw(request, (error, res) => {
          if (error) reject(error)
          else resolve(res)
        })
      })
    } catch (e) {
      throw e as ServiceError
    }

    return true
  }

  async buy(buyViewModel: IBuyViewModel, userId: string) {
    const request = new BuyRequest()

    request.setUserid(userId)
    request.setValue(buyViewModel.value)
    request.setFromSymbol(buyViewModel.symbol == "EUR" ? Symbol.EUR : Symbol.USD)

    try {
      const buy: BuyResponse = await new Promise((resolve, reject) => {
        UsersService.client.buy(request, (error, res) => {
          if (error) reject(error)
          else resolve(res)
        })
      })

      return buy.toObject()
    } catch (e) {
      throw e as ServiceError
    }
  }

  async listTransactions(userId: string, dates: Date[], curriences: ("USD" | "EUR")[]) {
    const request = new ListTransactionsRequest()

    request.setUserid(userId)
    request.setDateList(dates.map(date => {
      const timestamp = new Timestamp()

      timestamp.fromDate(date)

      return timestamp
    }))
    request.setCurrencyList(curriences.map(curr =>
      curr == "EUR" ? Symbol.EUR : Symbol.USD
    ))

    try {
      const transactions: ListTransactionsResponse = await new Promise((resolve, reject) => {
        UsersService.client.listTransactions(request, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })

      return transactions.getTransactionsList().map(tr => {
        const resOp = tr.getOperation()
        let operation: TransactionType

        if (resOp == Operation.DEPOSIT)
          operation = TransactionType.DEPOSIT
        if (resOp == Operation.WITHDRAW)
          operation = TransactionType.WITHDRAW
        if (resOp == Operation.BUY_DEPOSIT)
          operation = TransactionType.BUY_DEPOSIT
        if (resOp == Operation.BUY_WITHDRAW)
          operation = TransactionType.BUY_WITHDRAW

        return {
          id: tr.getId(),
          date: tr.getDate().toDate(),
          value: tr.getValue(),
          symbol: tr.getSymbol() == Symbol.EUR ? "EUR" : "USD",
          operation
        }
      })
    } catch (e) {
      throw e as ServiceError
    }
  }
}