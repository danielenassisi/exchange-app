import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { Operation } from "express-openapi"
import  * as passport from "passport"
import { IDepositViewModel } from "../../models/transactions/deposit/IDepositViewModel"
import { ReqUser } from "../../models/ReqUser"
import { UsersService } from "../../services/UsersService"
import { IBuyViewModel } from "../../models/transactions/buy/IBuyViewModel"
import { IBuyDto } from "../../models/transactions/buy/IBuyDto"
import { Symbol } from "../../proto_build/users_pb"


export const parameters = [
  {
    in: "body",
    name: "body",
    description: "Valore e valuta del dell'acquisto",
    required: true,
    schema: {
      $ref: "#/definitions/BuyViewModel"
    }
  }
]

export const POST: Operation = [
  passport.authenticate('bearer', { session: false }),
  (req, res, next) => {
    const buyViewModel = req.body as IBuyViewModel

    if (buyViewModel.symbol != "EUR" && buyViewModel.symbol != "USD") {
      res.status(400).send('Errore, valute non valide')
    }
    const service = new UsersService()

    service.buy(buyViewModel, (req.user as ReqUser).id)
      .then(serRes => {
        const dto: IBuyDto = {
          value: serRes.value,
          symbol: serRes.toSymbol == Symbol.EUR ? "EUR" : "USD"
        } 
        res.status(200).send(dto)
      })
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
  description: "Un endpoint per l'acquisto di una quantità di denaro",
  operationId: 'buyValue',
  tags: ["transactions"],
  summary: "Un api per acquistare denaro",
  responses: {
    200: {
      description: "Acquisto effettuato",
      schema: {
        $ref: '#/definitions/BuyDto'
      }
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