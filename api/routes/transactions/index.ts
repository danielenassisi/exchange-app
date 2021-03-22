import { Status } from "@grpc/grpc-js/build/src/constants"
import { Operation } from "express-openapi"
import * as passport from "passport"
import { ReqUser } from "../../models/ReqUser"
import { ITransactionsQueryParams } from "../../models/transactions/ITransactionsQueryParams"
import { UsersService } from "../../services/UsersService"



export const GET: Operation = [
  passport.authenticate('bearer', { session: false }),
  (req, res, next) => {
    let dates: Date[] = [], currencies: ("USD" | "EUR")[] = []
    
    console.log(req.query)
    if (req.query?.currencies) {
      console.log("entrato qui 2")
      currencies = req.query.currencies as ("USD" | "EUR")[]
    }
    if (req.query?.dates) {
      console.log("entrato qui 3")
      dates = (req.query && (req.query.dates as string[]).map(date => new Date(date)))
    }
    if (currencies.length == 2 && currencies[0] == currencies[1]) {
      res.status(400).send('Errore, le valute selezionate non possono essere duplicate')
    }

    console.log("sono qui 2")

    const service = new UsersService()

    service.listTransactions((req.user as ReqUser).id, dates, currencies)
      .then(transactions => res.status(200).send(transactions))
      .catch(err => {
        switch(err.code) {
          case Status.INTERNAL:
            res.status(500).send()
            break
        }
      })
  }
]

GET.apiDoc = {
  description: "Un endpoint per ottenere le transazioni di un utente",
  operationId: 'getTransactions',
  tags: ["transactions"],
  summary: "Un api per ottenere le transazioni",
  parameters: [
    {
      in: 'query',
      name: 'dates',
      required: false,
      description: 'Filtro sulle date',
      type: 'array',
      items: {
        type: 'string',
        format: 'date',
      }
    },
    {
      in: 'query',
      name: 'currencies',
      required: false,
      description: 'Filtro sulle valute',
      type: 'array',
      items: {
        type: 'string',
        enum: ['EUR', 'USD']
      },
      maxItems: 2
    }
  ],
  responses: {
    200: {
      description: "Transazioni ottenute",
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/Transaction'
        }
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