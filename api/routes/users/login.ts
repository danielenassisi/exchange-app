import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { Operation } from "express-openapi"
import { ILoginViewModel } from "../../models/users/login/ILoginViewModel"
import { UsersService } from "../../services/UsersService"
import { hasLowercaseCharacters, hasSpecialCharacters, hasUppercaseCharacters, isEmail, minCharactersFactory } from "../../utils/validators"

export const parameters = [
  {
    in: "body",
    name: "body",
    description: "email e password per l'accesso",
    required: true,
    schema: {
      $ref: "#/definitions/LoginViewModel"
    }
  }
]

export const POST: Operation = (req, res, next) => {
  const body = req.body as ILoginViewModel
  const { email, password } = body

  if (
    !isEmail(email) ||
    !hasLowercaseCharacters(password) ||
    !hasUppercaseCharacters(password) ||
    !hasSpecialCharacters(password) ||
    !(minCharactersFactory(8)(password))
  ) {
    res.status(400).send()
  }
  const userService = new UsersService()

  try {
    const response = userService.login(body)
    res.status(200).send(response)
  } catch(err) {
    const error = err as ServiceError

    switch (error.code) {
      case Status.INTERNAL:
        res.status(500).send()
        break
      case Status.NOT_FOUND:
        res.status(404).send()
        break
      case Status.INVALID_ARGUMENT:
        res.status(400).send()
    }
  }
}

POST.apiDoc = {
  description: "Un endpoint per il login di un utente",
  operationId: 'loginUser',
  tags: ["users"],
  summary: "Un api per ottenere un token JWT",
  responses: {
    200: {
      description: "Accesso effettuato",
      schema: {
        $ref: "#/definitions/LoginDto"
      }
    },
    500: {
      description: "Errore, riprovare più tardi"
    },
    404: {
      description: "Errore, utente non trovato"
    },
    default: {
      description: "Qualcosa è andato storto",
      schema: {
        $ref: "#/definitions/Error"
      }
    },
  }
}