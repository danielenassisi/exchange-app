import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { Operation } from "express-openapi"
import * as passport from "passport"
import { UsersService } from "../../services/UsersService"

export const parameters = [
  
]

export const GET: Operation = [
  passport.authenticate('bearer', { session: false }),
  (req, res, next) => {
    res.status(200).send(req.user)
  }
]

GET.apiDoc = {
  description: "Un endpoint per ottenere le informazioni sull'utente loggato",
  operationId: 'me',
  tags: ["users"],
  summary: "Un api per ottenere le informazioni dell'utente",
  responses: {
    200: {
      description: "Informazioni sull'utente che ha mandato la richiesta",
      schema: {
        $ref: "#/definitions/User"
      }
    },
    401: {
      description: 'Il token utilizzato non è valido',
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