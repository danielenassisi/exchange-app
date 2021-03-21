import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { Operation } from "express-openapi"
import  * as passport from "passport"
import { IDepositViewModel } from "../../models/transactions/deposit/IDepositViewModel"
import { ReqUser } from "../../models/ReqUser"
import { UsersService } from "../../services/UsersService"


export const parameters = [
  {
    in: "body",
    name: "body",
    description: "Valore e valuta del deposito",
    required: true,
    schema: {
      $ref: "#/definitions/DepositViewModel"
    }
  }
]

export const POST: Operation = [
  passport.authenticate('bearer', { session: false }),
  (req, res, next) => {
    const depositViewModel = req.body as IDepositViewModel

    if (depositViewModel.symbol != "EUR" && depositViewModel.symbol != "USD") {
      res.status(400).send('Errore, valute non valide')
    }
    const service = new UsersService()

    service.deposit(depositViewModel, (req.user as ReqUser).id)
      .then(value => res.status(200).send())
      .catch((err: ServiceError) => {
        switch(err.code) {
          case Status.INTERNAL:
            res.status(500).send()
            break
          default:
            res.status(400).send()
            break
        }
      })

  }
]

POST.apiDoc = {
  description: "Un endpoint per il deposito di una quantità di denaro",
  operationId: 'depositValue',
  tags: ["transactions"],
  summary: "Un api per depositare denaro",
  responses: {
    200: {
      description: "Deposito effettuato",
    },
    500: {
      description: "Errore, riprovare più tardi"
    },
    400: {
      description: "Errore, informazione non valide"
    },
    default: {
      description: "Qualcosa è andato storto",
      schema: {
        $ref: "#/definitions/Error"
      }
    },
  }
}