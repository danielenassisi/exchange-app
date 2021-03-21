import { User } from "../proto_build/users_pb";


export interface ReqUser extends User.AsObject, Express.User {}