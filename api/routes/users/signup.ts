import { Operation } from "express-openapi"
import { ISignupViewModel } from "../../models/users/signup/ISignupViewModel"
import { UsersService } from "../../services/UsersService"
import { hasLowercaseCharacters, hasSpecialCharacters, hasUppercaseCharacters, isEmail, isIban, minCharactersFactory } from "../../utils/validators"

export const parameters = [
  {
    in: "body",
    name: "body",
    description: "informazioni dell'utente da registrare",
    required: true,
    schema: {
      $ref: "#/definitions/SignupViewModel"
    }
  }
]

export const POST: Operation = (req, res, next) => {
  const body = req.body as ISignupViewModel
  const { email, password, confirmPassword, iban } = body

  if (
    !isEmail(email) ||
    !hasLowercaseCharacters(password) ||
    !hasUppercaseCharacters(password) ||
    !hasSpecialCharacters(password) ||
    !(minCharactersFactory(8)(password)) ||
    !(isIban(iban)) ||
    password !== confirmPassword) {
    res.status(400).send()
  }
  const userService = new UsersService()

  userService.signup(body)
    .then(result => result ? res.status(201).send() : res.status(500).send())
}

POST.apiDoc = {
  description: "Un endpoint per registrare un utente",
  operationId: 'SignupUser',
  tags: ["users"],
  summary: "Un api per registrare un utente",
  responses: {
    201: {
      description: "Utente registrato con successo",
    },
    500: {
      description: "Errore, riprovare più tardi"
    },
    default: {
      description: "Qualcosa è andato storto",
      schema: {
        $ref: "#/definitions/Error"
      }
    },
  }
}