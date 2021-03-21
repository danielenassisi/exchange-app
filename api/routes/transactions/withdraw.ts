import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { Operation } from "express-openapi"
import * as passport from "passport"
import { ReqUser } from "../../models/ReqUser"
import { IWithdrawViewModel } from "../../models/transactions/withdraw/IWithdrawViewModel"
import { UsersService } from "../../services/UsersService"

export const parameters = [
  {
    in: "body",
    name: "body",
    description: "Valore e valuta del prelievo",
    required: true,
    schema: {
      $ref: "#/definitions/WithdrawViewModel"
    }
  }
]

export const POST: Operation = [
  passport.authenticate('bearer', { session: false }),
  (req, res, next) => {
    const withdrawViewModel = req.body as IWithdrawViewModel

    if (withdrawViewModel.symbol != "EUR" && withdrawViewModel.symbol != "USD") {
      res.status(400).send('Errore, valute non valide')
    }
    
    const service = new UsersService()

    service.withdraw(withdrawViewModel, (req.user as ReqUser).id)
      .then(value => res.status(200).send())
      .catch((e: ServiceError) => {
        switch(e.code) {
          case Status.INTERNAL:
            res.status(500).send()
            break
          case Status.INVALID_ARGUMENT:
            res.status(400).send('Errore, soldi sul conto insufficienti')
            break
          case Status.NOT_FOUND:
            res.status(400).send()
            break
        }
      }) 
  }
]

POST.apiDoc = {
  description: "Un endpoint per il prelievo di una quantità di denaro",
  operationId: 'withdrawValue',
  tags: ["transactions"],
  summary: "Un api per prelevare denaro",
  responses: {
    200: {
      description: "Prelievo effettuato",
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