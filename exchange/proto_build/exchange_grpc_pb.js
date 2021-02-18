// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var exchange_pb = require('./exchange_pb.js');

function serialize_exchange_ExchangeRequest(arg) {
  if (!(arg instanceof exchange_pb.ExchangeRequest)) {
    throw new Error('Expected argument of type exchange.ExchangeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_exchange_ExchangeRequest(buffer_arg) {
  return exchange_pb.ExchangeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_exchange_ExchangeResponse(arg) {
  if (!(arg instanceof exchange_pb.ExchangeResponse)) {
    throw new Error('Expected argument of type exchange.ExchangeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_exchange_ExchangeResponse(buffer_arg) {
  return exchange_pb.ExchangeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ExchangeServiceService = exports.ExchangeServiceService = {
  exchange: {
    path: '/exchange.ExchangeService/Exchange',
    requestStream: false,
    responseStream: false,
    requestType: exchange_pb.ExchangeRequest,
    responseType: exchange_pb.ExchangeResponse,
    requestSerialize: serialize_exchange_ExchangeRequest,
    requestDeserialize: deserialize_exchange_ExchangeRequest,
    responseSerialize: serialize_exchange_ExchangeResponse,
    responseDeserialize: deserialize_exchange_ExchangeResponse,
  },
};

exports.ExchangeServiceClient = grpc.makeGenericClientConstructor(ExchangeServiceService);
