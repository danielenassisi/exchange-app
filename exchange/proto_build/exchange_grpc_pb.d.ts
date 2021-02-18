// package: exchange
// file: exchange.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as exchange_pb from "./exchange_pb";

interface IExchangeServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    exchange: IExchangeServiceService_IExchange;
}

interface IExchangeServiceService_IExchange extends grpc.MethodDefinition<exchange_pb.ExchangeRequest, exchange_pb.ExchangeResponse> {
    path: "/exchange.ExchangeService/Exchange";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<exchange_pb.ExchangeRequest>;
    requestDeserialize: grpc.deserialize<exchange_pb.ExchangeRequest>;
    responseSerialize: grpc.serialize<exchange_pb.ExchangeResponse>;
    responseDeserialize: grpc.deserialize<exchange_pb.ExchangeResponse>;
}

export const ExchangeServiceService: IExchangeServiceService;

export interface IExchangeServiceServer extends grpc.UntypedServiceImplementation {
    exchange: grpc.handleUnaryCall<exchange_pb.ExchangeRequest, exchange_pb.ExchangeResponse>;
}

export interface IExchangeServiceClient {
    exchange(request: exchange_pb.ExchangeRequest, callback: (error: grpc.ServiceError | null, response: exchange_pb.ExchangeResponse) => void): grpc.ClientUnaryCall;
    exchange(request: exchange_pb.ExchangeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: exchange_pb.ExchangeResponse) => void): grpc.ClientUnaryCall;
    exchange(request: exchange_pb.ExchangeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: exchange_pb.ExchangeResponse) => void): grpc.ClientUnaryCall;
}

export class ExchangeServiceClient extends grpc.Client implements IExchangeServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public exchange(request: exchange_pb.ExchangeRequest, callback: (error: grpc.ServiceError | null, response: exchange_pb.ExchangeResponse) => void): grpc.ClientUnaryCall;
    public exchange(request: exchange_pb.ExchangeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: exchange_pb.ExchangeResponse) => void): grpc.ClientUnaryCall;
    public exchange(request: exchange_pb.ExchangeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: exchange_pb.ExchangeResponse) => void): grpc.ClientUnaryCall;
}
