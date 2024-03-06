// GENERATED CODE -- DO NOT EDIT!

// package: ji_ui
// file: ui.proto

import * as ui_pb from "./ui_pb";
import * as grpc from "grpc";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: grpc.MethodDefinition<ui_pb.HelloRequest, ui_pb.HelloReply>;
  sayHelloStreamReply: grpc.MethodDefinition<ui_pb.HelloRequest, ui_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<ui_pb.HelloRequest, ui_pb.HelloReply>;
  sayHelloStreamReply: grpc.handleServerStreamingCall<ui_pb.HelloRequest, ui_pb.HelloReply>;
}
export const GreeterService: IGreeterService = new GreeterServiceImpl();

export class GreeterClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sayHello(argument: ui_pb.HelloRequest, callback: grpc.requestCallback<ui_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: ui_pb.HelloRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<ui_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: ui_pb.HelloRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<ui_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHelloStreamReply(argument: ui_pb.HelloRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<ui_pb.HelloReply>;
  sayHelloStreamReply(argument: ui_pb.HelloRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<ui_pb.HelloReply>;
}
