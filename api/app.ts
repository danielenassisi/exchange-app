import * as express from "express"
import { json } from "body-parser"
import { initialize } from "express-openapi"

const app = express()

app.use(json())

initialize({
  apiDoc: './docs/api-doc.yml',
  app,
  paths: './routes'
})

