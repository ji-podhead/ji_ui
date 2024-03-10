<p align="center">
  <img src="https://github.com/ji-soft/ji_ui/blob/master/images/ji_ui_mascot_3.png?raw=true" width="250"  />
</p>

----
### <p align="center"> about</p>
- **🚀 Cross-Platform UI Framework**:
 	<br> **=>_** Deploy to web and across numerous platforms using React (Native) and Go backend.
  	<br> **=>_** Eliminate the need for JSON thanks to gRPC.
	<br> **=>_** Support multiple programming languages thanks to gRPC => **flexible development environment**
- **🏃 Fast & Easy Production**: Preconfigured Hot Reload for rapid preview during the production stage.
- 📁 Includes a FileWatcher that automatically compiles `.proto` files, streamlining development.
- 📝 Automatically generates templates for new gRPC services and message types, accelerating development.
- 📱 After the production stage, the extension can build your React Native applications.
- 🌐 Develop microservices before cloud deployment => easy transition to cloud environments when required.
- 📡 Run UI applications directly on microcontrollers, such as Arduino, without consuming excessive RAM.

----
### <p align="center"> how it works</p>

<table style="width:100%;"> <tr> <td style="width:10%;" valign="top"> <ul> <li>gRPC enables efficient communication between the client and server. <br> It uses Protobuf for defining services and message types, providing strong type safety and easy integration across different programming languages.</li> <li>A Web Proxy, such as gRPC-Web, allows communication between a web browser and a gRPC server. </li> <li> By using gRPC and Protobuf, you can write services and applications in various programming languages. This allows for cross-platform compilation, as gRPC implementations are available for each language.</li> <li>By using a gRPC-Web proxy, you can directly integrate your gRPC services into web applications. </li> <li>The Go server serves as the backend for your application. It can host gRPC services and act as an interface to other backend services. </li> </ul> </td> <td style="width:60%;" valign="top"> <img src="https://github.com/ji-soft/ji_ui/blob/master/images/ji_ui.png?raw=true" width="500" /> </td> </tr> </table>

----
| Install | Initialize Project|
|---------|------------|
| **Api via npm**<br> upcoming | **Via Install Script**<br>upcoming |
| **Extension via  Code Marketplace** <br> upcoming   	|	**Via Extension**<br>install extension <br>  initialize through  command |
|	**Extension via  Git Clone** <br> clone project <br>open extension folder in code	| **Via ExampleProject**<br> clone project, open *example project folder* in code<br> debug and have fun (will start 3 terminal windows in code) |


----
# Why 

### <p align="center"> Motivation </p>
In my search for a tool that perfectly meets my needs... This led me to start developing a cross-platform UI framework, designed with a React/Web-based frontend and a backend using a higher-level language. This framework is built to make cross-compilation easy, with gRPC playing a key role, ensuring compatibility within containers (if needed) and simplifying the development of microservices outside of cloud environments.
### <p align="center"> <img src="https://github.com/ji-soft/ji_ui/blob/master/images/ji_ui.png?raw=true" width="500" />  </p>
 
### <p align="center"> 🚀 Advantages of Using Go as a Backend </p>
 **Performance and Scalability**: Go is renowned for its high performance and efficiency, especially in handling network requests and resource management. This makes it an ideal choice for backend services that need to handle high loads. <br>
 **Constant Runtime**: Go applications have a constant runtime, meaning they are not affected by the number of concurrent requests. This is crucial for backend services serving a large number of simultaneous users. <br> 
 **Security**: Go offers a robust standard library with many security features, including support for HTTPS, prevention of Cross-Site Scripting (XSS), and SQL Injection. This is essential for the security of backend services.  <br>
 **Simplicity and Maintenance**: Go applications are generally simpler to configure and maintain than complex backend architectures based on multiple technologies. This reduces complexity and improves maintainability.  <br>
 **gRPC Support**: gRPC is a high-performance RPC framework developed by Google. It supports efficient communication between clients and servers and multiple programming languages, including Go. Using gRPC can significantly improve the performance and scalability of backend services.  <br>
 **Efficient Network Management**: Go provides efficient mechanisms for network management, including support for HTTP/2 and gRPC, which can reduce network load and improve performance.  <br>
 **Excellent Support for Microservices**: Go is excellent for developing microservices, as it is lightweight and supports easy deployment. This is particularly useful for modern, scalable backend architectures. <br>
 **Global Variables and Static Typing**: Go offers global variables and static typing, which can simplify the development and maintenance of backend services. These features can help reduce errors and improve code quality. 

### <p align="center">🌐 Advantages of Using React with gRPC</p>
**Efficient Data Handling**: React is a powerful library for building user interfaces, but when combined with gRPC, it can efficiently handle data in real-time. gRPC's support for streaming and bidirectional communication allows for a seamless data flow between the client and server, enhancing the user experience.  <br>
**Type Safety**: gRPC uses Protocol Buffers (protobuf) for defining services and message types, which provides strong type safety. This means that the data structures are defined once and used across the client and server, reducing the risk of errors and improving the maintainability of the code.  <br>
**Performance**: gRPC is known for its high performance, especially in terms of speed and efficiency. It uses HTTP/2 for transport, which allows for multiplexing, lower latency, and header compression. This can lead to faster load times and a smoother user experience in React applications.  <br>
**Streaming Support**: gRPC supports streaming, which allows for real-time data updates without the need for polling. This is particularly useful in applications that require live updates, such as chat applications or real-time analytics.  <br>
**Language Agnostic**: gRPC is language-agnostic, meaning it can be used with any programming language that supports gRPC, including JavaScript for React applications. This allows for a flexible development environment and makes it easier to integrate with other services or components.  <br>
**Interoperability**: gRPC is designed to be interoperable, meaning it can work with a wide range of systems and services. This is beneficial for applications that need to integrate with existing systems or services, as it reduces the need for custom integrations.  <br>
**Security**: gRPC supports transport security with TLS, ensuring that data transmitted between the client and server is encrypted. This is crucial for applications that handle sensitive information. 

---
### <p align="center"> Database_Schema </p>
```
JI_UI
|
|-- Database_Schema
|       |
|       |-- ProtoFile
|       |   |-- Name
|       |   |-- Index
|       |   |-- ProtoFilePath
|       |   |-- Message
|       |   |   |-- Content
|       |   |   |-- Lang
|       |   |   |-- Parent
|       |   |
|       |   |-- Enum
|       |   |   |-- Content
|       |   |   |-- Lang
|       |   |   |-- Parent
|       |
|       |-- Endpoint 
|       |   |-- Name
|       |   |-- Index
|       |   |-- EndpointPath
|       |   |-- Protofiles
|       |   |-- ProtobuffFiles
|       |       |-- ProtoFilePath
|       |       |-- ProtobuffFilePath
|       |       |-- Clients
|       |       |-- Requests
|       |       |-- Callbacks
|       |       |-- Streams
|       |
|       |-- ProtobuffUser
|       |   |
|       |   |-- ProtobuffUserPath
|       |   |-- ProtobuffUserComponent
|       |        |-- type
|       |        |-- parent
|       |        |-- line
|       |        |-- content
|       |
|       |-- ProtobuffUserComponentPreset
|       |    |
|       |    |-- type
|       |    |-- lang
|       |    |-- preset

```

---
# Code Snippets (minimal example)
**proto file *(protobuffs are in example project folder)***
```
syntax = "proto3";
option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";
option go_package = "github.com/ji-soft/ji_ui/protos";
package ji_ui;
// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  rpc SayHelloStreamReply (HelloRequest) returns (stream HelloReply) {}
}
// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}
// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```
**React frontend** 

```
import React, { useState } from 'react';
import { GreeterClient as Greeter } from './ui_pb_service';
import { HelloRequest,HelloReply } from './ui_pb';

const App = () => {
 const [message, setMessage] = useState('noMesg');
 const [name, setName] = useState('not set');
 const [inputValue, setInputValue] = useState('not set');
 const handleInputChange = (event) => {
  setInputValue(event.target.value);
};
const handleSubmit = (event) => {
  event.preventDefault();
  setName(inputValue); 
};

 const sendHelloRequest = async () => {
    const client = new Greeter('http://localhost:8080'); 
    const request = new HelloRequest();
    request.setName(name);

    try {
     client.sayHello(request,function(err, response) {
        setMessage('MSG from GO BACKEND :'+ response.getMessage());
     });
    } catch (error) {
      console.error('error while sending:', error);
    }
 };
```
**backend**
```

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```
