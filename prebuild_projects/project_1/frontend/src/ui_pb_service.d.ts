// package: ji_ui
// file: ui.proto

import * as ui_pb from "./ui_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GreeterSayHello = {
  readonly methodName: string;
  readonly service: typeof Greeter;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ui_pb.HelloRequest;
  readonly responseType: typeof ui_pb.HelloReply;
};

type GreeterSayHelloStreamReply = {
  readonly methodName: string;
  readonly service: typeof Greeter;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof ui_pb.HelloRequest;
  readonly responseType: typeof ui_pb.HelloReply;
};

export class Greeter {
  static readonly serviceName: string;
  static readonly SayHello: GreeterSayHello;
  static readonly SayHelloStreamReply: GreeterSayHelloStreamReply;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class GreeterClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sayHello(
    requestMessage: ui_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ui_pb.HelloReply|null) => void
  ): UnaryResponse;
  sayHello(
    requestMessage: ui_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: ui_pb.HelloReply|null) => void
  ): UnaryResponse;
  sayHelloStreamReply(requestMessage: ui_pb.HelloRequest, metadata?: grpc.Metadata): ResponseStream<ui_pb.HelloReply>;
}

