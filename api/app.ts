import * as express from "express"
import * as cors from "cors"
import { json } from "body-parser"
import { initialize } from "express-openapi"
import { apiDoc } from "./docs/api-doc"
import { UsersService } from "./services/UsersService"

const app = express()

app.use(json())
app.use(cors())

initialize({
  apiDoc,
  app,
  docsPath: '/docs',
  dependencies: {
    usersService: new UsersService()
  },
  paths: './routes',
  routesGlob: '**/*.{ts,js}',
  routesIndexFileRegExp: /(?:index)?\.[tj]s$/
})

app.use(((err, req, res, next) => {
  res.status(err.status).json(err);
}) as express.ErrorRequestHandler);

app.listen(80);