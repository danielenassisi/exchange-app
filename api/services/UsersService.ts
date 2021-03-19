import { ISignupViewModel } from "../models/users/signup/ISignupViewModel"
import { ILoginViewModel } from "../models/users/login/ILoginViewModel"
import { UsersServiceClient } from "../proto_build/users_grpc_pb"
import { SignupRequest, LoginRequest, LoginResponse } from "../proto_build/users_pb"
import { ChannelCredentials, ServiceError } from "@grpc/grpc-js"

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
    } catch(err) {
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

      console.log(loginRes.toObject())

      return loginRes.toObject()
    } catch(err) {
      throw err
    }
  }
}