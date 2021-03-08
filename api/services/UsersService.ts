import { ISignupViewModel } from "../models/users/signup/ISignupViewModel"
import { ILoginViewModel } from "../models/users/login/ILoginViewModel"
import { UsersServiceClient } from "../proto_build/users_grpc_pb"
import { SignupRequest } from "../proto_build/users_pb"
import { ChannelCredentials } from "@grpc/grpc-js"

export class UsersService {
  private static ADDRESS = "users:9001"

  async signup(signupViewModel: ISignupViewModel) {
    const client = new UsersServiceClient(UsersService.ADDRESS, ChannelCredentials.createInsecure())
    const { email, name, surname, iban, password } = signupViewModel
    const request = new SignupRequest()

    request.setEmail(email)
    request.setIban(iban)
    request.setName(name)
    request.setSurname(surname)
    request.setPassword(password)

    try {
      const signupUser = await new Promise((resolve, reject) => {
        client.signup(request, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })
    } catch(err) {
      return false      
    }
    

    return true
  }

  async login() {

  }
}