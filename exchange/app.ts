import loader from "./utils/loader";
import load from "./utils/loader"
import { join } from "path"

const PROTO_PATH = join('.', 'protos', 'exchange.proto') 

const service = load(PROTO_PATH, "exchange")
console.log(service)