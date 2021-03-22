// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class CurrentAccount extends jspb.Message { 
    getId(): string;
    setId(value: string): CurrentAccount;

    getValue(): number;
    setValue(value: number): CurrentAccount;

    getSymbol(): Symbol;
    setSymbol(value: Symbol): CurrentAccount;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CurrentAccount.AsObject;
    static toObject(includeInstance: boolean, msg: CurrentAccount): CurrentAccount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CurrentAccount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CurrentAccount;
    static deserializeBinaryFromReader(message: CurrentAccount, reader: jspb.BinaryReader): CurrentAccount;
}

export namespace CurrentAccount {
    export type AsObject = {
        id: string,
        value: number,
        symbol: Symbol,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;

    getName(): string;
    setName(value: string): User;

    getSurname(): string;
    setSurname(value: string): User;

    getEmail(): string;
    setEmail(value: string): User;

    getIban(): string;
    setIban(value: string): User;


    hasEurcurrentaccount(): boolean;
    clearEurcurrentaccount(): void;
    getEurcurrentaccount(): CurrentAccount | undefined;
    setEurcurrentaccount(value?: CurrentAccount): User;


    hasUsdcurrentaccount(): boolean;
    clearUsdcurrentaccount(): void;
    getUsdcurrentaccount(): CurrentAccount | undefined;
    setUsdcurrentaccount(value?: CurrentAccount): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        name: string,
        surname: string,
        email: string,
        iban: string,
        eurcurrentaccount?: CurrentAccount.AsObject,
        usdcurrentaccount?: CurrentAccount.AsObject,
    }
}

export class SignupRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): SignupRequest;

    getPassword(): string;
    setPassword(value: string): SignupRequest;

    getName(): string;
    setName(value: string): SignupRequest;

    getSurname(): string;
    setSurname(value: string): SignupRequest;

    getIban(): string;
    setIban(value: string): SignupRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignupRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SignupRequest): SignupRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignupRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignupRequest;
    static deserializeBinaryFromReader(message: SignupRequest, reader: jspb.BinaryReader): SignupRequest;
}

export namespace SignupRequest {
    export type AsObject = {
        email: string,
        password: string,
        name: string,
        surname: string,
        iban: string,
    }
}

export class LoginRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): LoginRequest;

    getPassword(): string;
    setPassword(value: string): LoginRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        email: string,
        password: string,
    }
}

export class LoginResponse extends jspb.Message { 
    getToken(): string;
    setToken(value: string): LoginResponse;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): LoginResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginResponse;
    static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
    export type AsObject = {
        token: string,
        user?: User.AsObject,
    }
}

export class MeRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): MeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MeRequest): MeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MeRequest;
    static deserializeBinaryFromReader(message: MeRequest, reader: jspb.BinaryReader): MeRequest;
}

export namespace MeRequest {
    export type AsObject = {
        token: string,
    }
}

export class DepositRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): DepositRequest;

    getValue(): number;
    setValue(value: number): DepositRequest;

    getSymbol(): Symbol;
    setSymbol(value: Symbol): DepositRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DepositRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DepositRequest): DepositRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DepositRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DepositRequest;
    static deserializeBinaryFromReader(message: DepositRequest, reader: jspb.BinaryReader): DepositRequest;
}

export namespace DepositRequest {
    export type AsObject = {
        userid: string,
        value: number,
        symbol: Symbol,
    }
}

export class WithdrawRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): WithdrawRequest;

    getValue(): number;
    setValue(value: number): WithdrawRequest;

    getSymbol(): Symbol;
    setSymbol(value: Symbol): WithdrawRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WithdrawRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WithdrawRequest): WithdrawRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WithdrawRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WithdrawRequest;
    static deserializeBinaryFromReader(message: WithdrawRequest, reader: jspb.BinaryReader): WithdrawRequest;
}

export namespace WithdrawRequest {
    export type AsObject = {
        userid: string,
        value: number,
        symbol: Symbol,
    }
}

export class BuyRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): BuyRequest;

    getFromSymbol(): Symbol;
    setFromSymbol(value: Symbol): BuyRequest;

    getValue(): number;
    setValue(value: number): BuyRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BuyRequest): BuyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuyRequest;
    static deserializeBinaryFromReader(message: BuyRequest, reader: jspb.BinaryReader): BuyRequest;
}

export namespace BuyRequest {
    export type AsObject = {
        userid: string,
        fromSymbol: Symbol,
        value: number,
    }
}

export class BuyResponse extends jspb.Message { 
    getValue(): number;
    setValue(value: number): BuyResponse;

    getToSymbol(): Symbol;
    setToSymbol(value: Symbol): BuyResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BuyResponse): BuyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuyResponse;
    static deserializeBinaryFromReader(message: BuyResponse, reader: jspb.BinaryReader): BuyResponse;
}

export namespace BuyResponse {
    export type AsObject = {
        value: number,
        toSymbol: Symbol,
    }
}

export class Transaction extends jspb.Message { 
    getId(): string;
    setId(value: string): Transaction;

    getValue(): number;
    setValue(value: number): Transaction;

    getSymbol(): Symbol;
    setSymbol(value: Symbol): Transaction;


    hasDate(): boolean;
    clearDate(): void;
    getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDate(value?: google_protobuf_timestamp_pb.Timestamp): Transaction;

    getOperation(): Operation;
    setOperation(value: Operation): Transaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Transaction.AsObject;
    static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Transaction;
    static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
    export type AsObject = {
        id: string,
        value: number,
        symbol: Symbol,
        date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        operation: Operation,
    }
}

export class ListTransactionsRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): ListTransactionsRequest;

    clearDateList(): void;
    getDateList(): Array<google_protobuf_timestamp_pb.Timestamp>;
    setDateList(value: Array<google_protobuf_timestamp_pb.Timestamp>): ListTransactionsRequest;
    addDate(value?: google_protobuf_timestamp_pb.Timestamp, index?: number): google_protobuf_timestamp_pb.Timestamp;

    clearCurrencyList(): void;
    getCurrencyList(): Array<Symbol>;
    setCurrencyList(value: Array<Symbol>): ListTransactionsRequest;
    addCurrency(value: Symbol, index?: number): Symbol;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListTransactionsRequest): ListTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTransactionsRequest;
    static deserializeBinaryFromReader(message: ListTransactionsRequest, reader: jspb.BinaryReader): ListTransactionsRequest;
}

export namespace ListTransactionsRequest {
    export type AsObject = {
        userid: string,
        dateList: Array<google_protobuf_timestamp_pb.Timestamp.AsObject>,
        currencyList: Array<Symbol>,
    }
}

export class ListTransactionsResponse extends jspb.Message { 
    clearTransactionsList(): void;
    getTransactionsList(): Array<Transaction>;
    setTransactionsList(value: Array<Transaction>): ListTransactionsResponse;
    addTransactions(value?: Transaction, index?: number): Transaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTransactionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListTransactionsResponse): ListTransactionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTransactionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTransactionsResponse;
    static deserializeBinaryFromReader(message: ListTransactionsResponse, reader: jspb.BinaryReader): ListTransactionsResponse;
}

export namespace ListTransactionsResponse {
    export type AsObject = {
        transactionsList: Array<Transaction.AsObject>,
    }
}

export enum Symbol {
    EUR = 0,
    USD = 1,
}

export enum Operation {
    DEPOSIT = 0,
    WITHDRAW = 1,
    BUY_DEPOSIT = 2,
    BUY_WITHDRAW = 3,
}
