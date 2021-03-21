// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as users_pb from "./users_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IUsersServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    signup: IUsersServiceService_ISignup;
    login: IUsersServiceService_ILogin;
    me: IUsersServiceService_IMe;
    deposit: IUsersServiceService_IDeposit;
    withdraw: IUsersServiceService_IWithdraw;
    buy: IUsersServiceService_IBuy;
    listTransactions: IUsersServiceService_IListTransactions;
}

interface IUsersServiceService_ISignup extends grpc.MethodDefinition<users_pb.SignupRequest, google_protobuf_empty_pb.Empty> {
    path: "/users.UsersService/Signup";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.SignupRequest>;
    requestDeserialize: grpc.deserialize<users_pb.SignupRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IUsersServiceService_ILogin extends grpc.MethodDefinition<users_pb.LoginRequest, users_pb.LoginResponse> {
    path: "/users.UsersService/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<users_pb.LoginRequest>;
    responseSerialize: grpc.serialize<users_pb.LoginResponse>;
    responseDeserialize: grpc.deserialize<users_pb.LoginResponse>;
}
interface IUsersServiceService_IMe extends grpc.MethodDefinition<users_pb.MeRequest, users_pb.User> {
    path: "/users.UsersService/Me";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.MeRequest>;
    requestDeserialize: grpc.deserialize<users_pb.MeRequest>;
    responseSerialize: grpc.serialize<users_pb.User>;
    responseDeserialize: grpc.deserialize<users_pb.User>;
}
interface IUsersServiceService_IDeposit extends grpc.MethodDefinition<users_pb.DepositRequest, google_protobuf_empty_pb.Empty> {
    path: "/users.UsersService/Deposit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.DepositRequest>;
    requestDeserialize: grpc.deserialize<users_pb.DepositRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IUsersServiceService_IWithdraw extends grpc.MethodDefinition<users_pb.WithdrawRequest, google_protobuf_empty_pb.Empty> {
    path: "/users.UsersService/Withdraw";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.WithdrawRequest>;
    requestDeserialize: grpc.deserialize<users_pb.WithdrawRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IUsersServiceService_IBuy extends grpc.MethodDefinition<users_pb.BuyRequest, users_pb.BuyResponse> {
    path: "/users.UsersService/Buy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.BuyRequest>;
    requestDeserialize: grpc.deserialize<users_pb.BuyRequest>;
    responseSerialize: grpc.serialize<users_pb.BuyResponse>;
    responseDeserialize: grpc.deserialize<users_pb.BuyResponse>;
}
interface IUsersServiceService_IListTransactions extends grpc.MethodDefinition<users_pb.ListTransactionsRequest, users_pb.ListTransactionsResponse> {
    path: "/users.UsersService/ListTransactions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.ListTransactionsRequest>;
    requestDeserialize: grpc.deserialize<users_pb.ListTransactionsRequest>;
    responseSerialize: grpc.serialize<users_pb.ListTransactionsResponse>;
    responseDeserialize: grpc.deserialize<users_pb.ListTransactionsResponse>;
}

export const UsersServiceService: IUsersServiceService;

export interface IUsersServiceServer extends grpc.UntypedServiceImplementation {
    signup: grpc.handleUnaryCall<users_pb.SignupRequest, google_protobuf_empty_pb.Empty>;
    login: grpc.handleUnaryCall<users_pb.LoginRequest, users_pb.LoginResponse>;
    me: grpc.handleUnaryCall<users_pb.MeRequest, users_pb.User>;
    deposit: grpc.handleUnaryCall<users_pb.DepositRequest, google_protobuf_empty_pb.Empty>;
    withdraw: grpc.handleUnaryCall<users_pb.WithdrawRequest, google_protobuf_empty_pb.Empty>;
    buy: grpc.handleUnaryCall<users_pb.BuyRequest, users_pb.BuyResponse>;
    listTransactions: grpc.handleUnaryCall<users_pb.ListTransactionsRequest, users_pb.ListTransactionsResponse>;
}

export interface IUsersServiceClient {
    signup(request: users_pb.SignupRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    signup(request: users_pb.SignupRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    signup(request: users_pb.SignupRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    login(request: users_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: users_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    login(request: users_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    login(request: users_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    me(request: users_pb.MeRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    me(request: users_pb.MeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    me(request: users_pb.MeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    deposit(request: users_pb.DepositRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deposit(request: users_pb.DepositRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deposit(request: users_pb.DepositRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    withdraw(request: users_pb.WithdrawRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    withdraw(request: users_pb.WithdrawRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    withdraw(request: users_pb.WithdrawRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    buy(request: users_pb.BuyRequest, callback: (error: grpc.ServiceError | null, response: users_pb.BuyResponse) => void): grpc.ClientUnaryCall;
    buy(request: users_pb.BuyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.BuyResponse) => void): grpc.ClientUnaryCall;
    buy(request: users_pb.BuyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.BuyResponse) => void): grpc.ClientUnaryCall;
    listTransactions(request: users_pb.ListTransactionsRequest, callback: (error: grpc.ServiceError | null, response: users_pb.ListTransactionsResponse) => void): grpc.ClientUnaryCall;
    listTransactions(request: users_pb.ListTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.ListTransactionsResponse) => void): grpc.ClientUnaryCall;
    listTransactions(request: users_pb.ListTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.ListTransactionsResponse) => void): grpc.ClientUnaryCall;
}

export class UsersServiceClient extends grpc.Client implements IUsersServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public signup(request: users_pb.SignupRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public signup(request: users_pb.SignupRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public signup(request: users_pb.SignupRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public login(request: users_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: users_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public login(request: users_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public login(request: users_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public me(request: users_pb.MeRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public me(request: users_pb.MeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public me(request: users_pb.MeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public deposit(request: users_pb.DepositRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deposit(request: users_pb.DepositRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deposit(request: users_pb.DepositRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public withdraw(request: users_pb.WithdrawRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public withdraw(request: users_pb.WithdrawRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public withdraw(request: users_pb.WithdrawRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public buy(request: users_pb.BuyRequest, callback: (error: grpc.ServiceError | null, response: users_pb.BuyResponse) => void): grpc.ClientUnaryCall;
    public buy(request: users_pb.BuyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.BuyResponse) => void): grpc.ClientUnaryCall;
    public buy(request: users_pb.BuyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.BuyResponse) => void): grpc.ClientUnaryCall;
    public listTransactions(request: users_pb.ListTransactionsRequest, callback: (error: grpc.ServiceError | null, response: users_pb.ListTransactionsResponse) => void): grpc.ClientUnaryCall;
    public listTransactions(request: users_pb.ListTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.ListTransactionsResponse) => void): grpc.ClientUnaryCall;
    public listTransactions(request: users_pb.ListTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.ListTransactionsResponse) => void): grpc.ClientUnaryCall;
}
