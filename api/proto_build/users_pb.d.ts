// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

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

export class DepositRequest extends jspb.Message { 
    getValue(): number;
    setValue(value: number): DepositRequest;
    getSymbol(): string;
    setSymbol(value: string): DepositRequest;

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
        value: number,
        symbol: string,
    }
}

export class WithdrawRequest extends jspb.Message { 
    getValue(): number;
    setValue(value: number): WithdrawRequest;
    getSymbol(): string;
    setSymbol(value: string): WithdrawRequest;

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
        value: number,
        symbol: string,
    }
}

export class BuyRequest extends jspb.Message { 
    getFromSymbol(): string;
    setFromSymbol(value: string): BuyRequest;
    getValue(): number;
    setValue(value: number): BuyRequest;
    getToSymbol(): string;
    setToSymbol(value: string): BuyRequest;

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
        fromSymbol: string,
        value: number,
        toSymbol: string,
    }
}

export class Transaction extends jspb.Message { 
    getId(): string;
    setId(value: string): Transaction;
    getValue(): number;
    setValue(value: number): Transaction;
    getSymbol(): string;
    setSymbol(value: string): Transaction;
    getDate(): string;
    setDate(value: string): Transaction;

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
        symbol: string,
        date: string,
    }
}

export class ListTransactionsRequest extends jspb.Message { 
    clearDateList(): void;
    getDateList(): Array<string>;
    setDateList(value: Array<string>): ListTransactionsRequest;
    addDate(value: string, index?: number): string;
    clearCurrencyList(): void;
    getCurrencyList(): Array<string>;
    setCurrencyList(value: Array<string>): ListTransactionsRequest;
    addCurrency(value: string, index?: number): string;

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
        dateList: Array<string>,
        currencyList: Array<string>,
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
