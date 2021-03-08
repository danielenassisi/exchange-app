// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var users_pb = require('./users_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_BuyRequest(arg) {
  if (!(arg instanceof users_pb.BuyRequest)) {
    throw new Error('Expected argument of type users.BuyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_BuyRequest(buffer_arg) {
  return users_pb.BuyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_DepositRequest(arg) {
  if (!(arg instanceof users_pb.DepositRequest)) {
    throw new Error('Expected argument of type users.DepositRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_DepositRequest(buffer_arg) {
  return users_pb.DepositRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_ListTransactionsRequest(arg) {
  if (!(arg instanceof users_pb.ListTransactionsRequest)) {
    throw new Error('Expected argument of type users.ListTransactionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_ListTransactionsRequest(buffer_arg) {
  return users_pb.ListTransactionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_ListTransactionsResponse(arg) {
  if (!(arg instanceof users_pb.ListTransactionsResponse)) {
    throw new Error('Expected argument of type users.ListTransactionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_ListTransactionsResponse(buffer_arg) {
  return users_pb.ListTransactionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_LoginRequest(arg) {
  if (!(arg instanceof users_pb.LoginRequest)) {
    throw new Error('Expected argument of type users.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_LoginRequest(buffer_arg) {
  return users_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_LoginResponse(arg) {
  if (!(arg instanceof users_pb.LoginResponse)) {
    throw new Error('Expected argument of type users.LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_LoginResponse(buffer_arg) {
  return users_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_SignupRequest(arg) {
  if (!(arg instanceof users_pb.SignupRequest)) {
    throw new Error('Expected argument of type users.SignupRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_SignupRequest(buffer_arg) {
  return users_pb.SignupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_WithdrawRequest(arg) {
  if (!(arg instanceof users_pb.WithdrawRequest)) {
    throw new Error('Expected argument of type users.WithdrawRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_WithdrawRequest(buffer_arg) {
  return users_pb.WithdrawRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersServiceService = exports.UsersServiceService = {
  signup: {
    path: '/users.UsersService/Signup',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.SignupRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_users_SignupRequest,
    requestDeserialize: deserialize_users_SignupRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  login: {
    path: '/users.UsersService/Login',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.LoginRequest,
    responseType: users_pb.LoginResponse,
    requestSerialize: serialize_users_LoginRequest,
    requestDeserialize: deserialize_users_LoginRequest,
    responseSerialize: serialize_users_LoginResponse,
    responseDeserialize: deserialize_users_LoginResponse,
  },
  deposit: {
    path: '/users.UsersService/Deposit',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.DepositRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_users_DepositRequest,
    requestDeserialize: deserialize_users_DepositRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  withdraw: {
    path: '/users.UsersService/Withdraw',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.WithdrawRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_users_WithdrawRequest,
    requestDeserialize: deserialize_users_WithdrawRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  buy: {
    path: '/users.UsersService/Buy',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.BuyRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_users_BuyRequest,
    requestDeserialize: deserialize_users_BuyRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  listTransactions: {
    path: '/users.UsersService/ListTransactions',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.ListTransactionsRequest,
    responseType: users_pb.ListTransactionsResponse,
    requestSerialize: serialize_users_ListTransactionsRequest,
    requestDeserialize: deserialize_users_ListTransactionsRequest,
    responseSerialize: serialize_users_ListTransactionsResponse,
    responseDeserialize: deserialize_users_ListTransactionsResponse,
  },
};

exports.UsersServiceClient = grpc.makeGenericClientConstructor(UsersServiceService);
