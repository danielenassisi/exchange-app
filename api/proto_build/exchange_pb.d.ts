// package: exchange
// file: exchange.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ExchangeRequest extends jspb.Message { 
    getValue(): number;
    setValue(value: number): ExchangeRequest;
    getFrom(): ExchangeRequest.Symbol;
    setFrom(value: ExchangeRequest.Symbol): ExchangeRequest;
    getTo(): ExchangeRequest.Symbol;
    setTo(value: ExchangeRequest.Symbol): ExchangeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExchangeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ExchangeRequest): ExchangeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExchangeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExchangeRequest;
    static deserializeBinaryFromReader(message: ExchangeRequest, reader: jspb.BinaryReader): ExchangeRequest;
}

export namespace ExchangeRequest {
    export type AsObject = {
        value: number,
        from: ExchangeRequest.Symbol,
        to: ExchangeRequest.Symbol,
    }

    export enum Symbol {
    EUR = 0,
    USD = 1,
    }

}

export class ExchangeResponse extends jspb.Message { 
    getValue(): number;
    setValue(value: number): ExchangeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExchangeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ExchangeResponse): ExchangeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExchangeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExchangeResponse;
    static deserializeBinaryFromReader(message: ExchangeResponse, reader: jspb.BinaryReader): ExchangeResponse;
}

export namespace ExchangeResponse {
    export type AsObject = {
        value: number,
    }
}
