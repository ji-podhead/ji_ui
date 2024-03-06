# JI_UI

----
 **🏃 Fast & Easy UI Framework**: Preconfigured Hot Reload for Quick Preview in Production Stage </small> <br>
 **📁 Command Autogeneration**:   <small> includes a FileWatcher that automatically compiles `.proto` files.  </small>  <br>
 **📝 Template Generation**: generates templates for new gRPC services and message types.  <br>
 **📱 Simplified Deployment**:   after the production stage, the extension can build your React Native applications.
 
----
### <p align="center"> how it works</p>
<p align="center">
 <img src="https://github.com/ji-soft/ji_ui/blob/master/images/ji_ui.png?raw=true" width="500" />
</p>

----

# Install

- clone project,  extension folder in code => f5 to debug => create new project and initialize trough extension via "f1"
- **Quickstart** :clone project, open *demo project folder* in code 
- debug and have fun (will start 3 terminal windows in code)

# Code Snippets
**React frontend** 

```
import React, { useState } from 'react';
import { GreeterClient as Greeter } from './ui_pb_service'; // Stellen Sie sicher, dass der Pfad korrekt ist
import { HelloRequest,HelloReply } from './ui_pb'; // Stellen Sie sicher, dass der Pfad korrekt ist

const App = () => {
 const [message, setMessage] = useState('noMesg');
 const [name, setName] = useState('not set');
 const [inputValue, setInputValue] = useState('not set');
 const handleInputChange = (event) => {
  setInputValue(event.target.value);
};
const handleSubmit = (event) => {
  event.preventDefault();
  setName(inputValue); // Aktualisieren Sie den Namen-State mit dem Wert aus dem Eingabefeld
};

 const sendHelloRequest = async () => {
    const client = new Greeter('http://localhost:8080'); // Ersetzen Sie die URL durch die Ihres Servers
    const request = new HelloRequest();
    request.setName(name); // Setzen Sie den Namen, den Sie senden möchten

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


----
### <p align="center"> 🚀 Advantages of Using Go as a Backend </p>
 **Performance and Scalability**: Go is renowned for its high performance and efficiency, especially in handling network requests and resource management. This makes it an ideal choice for backend services that need to handle high loads. <br>
 **Constant Runtime**: Go applications have a constant runtime, meaning they are not affected by the number of concurrent requests. This is crucial for backend services serving a large number of simultaneous users. <br> 
 **Security**: Go offers a robust standard library with many security features, including support for HTTPS, prevention of Cross-Site Scripting (XSS), and SQL Injection. This is essential for the security of backend services.  <br>
 **Simplicity and Maintenance**: Go applications are generally simpler to configure and maintain than complex backend architectures based on multiple technologies. This reduces complexity and improves maintainability.  <br>
 **gRPC Support**: gRPC is a high-performance RPC framework developed by Google. It supports efficient communication between clients and servers and multiple programming languages, including Go. Using gRPC can significantly improve the performance and scalability of backend services.  <br>
 **Efficient Network Management**: Go provides efficient mechanisms for network management, including support for HTTP/2 and gRPC, which can reduce network load and improve performance.  <br>
 **Excellent Support for Microservices**: Go is excellent for developing microservices, as it is lightweight and supports easy deployment. This is particularly useful for modern, scalable backend architectures. <br>
 **Global Variables and Static Typing**: Go offers global variables and static typing, which can simplify the development and maintenance of backend services. These features can help reduce errors and improve code quality. 

## 🌐 Advantages of Using React with gRPC

**Efficient Data Handling**: React is a powerful library for building user interfaces, but when combined with gRPC, it can efficiently handle data in real-time. gRPC's support for streaming and bidirectional communication allows for a seamless data flow between the client and server, enhancing the user experience.  <br>
**Type Safety**: gRPC uses Protocol Buffers (protobuf) for defining services and message types, which provides strong type safety. This means that the data structures are defined once and used across the client and server, reducing the risk of errors and improving the maintainability of the code.  <br>
**Performance**: gRPC is known for its high performance, especially in terms of speed and efficiency. It uses HTTP/2 for transport, which allows for multiplexing, lower latency, and header compression. This can lead to faster load times and a smoother user experience in React applications.  <br>
**Streaming Support**: gRPC supports streaming, which allows for real-time data updates without the need for polling. This is particularly useful in applications that require live updates, such as chat applications or real-time analytics.  <br>
**Language Agnostic**: gRPC is language-agnostic, meaning it can be used with any programming language that supports gRPC, including JavaScript for React applications. This allows for a flexible development environment and makes it easier to integrate with other services or components.  <br>
**Interoperability**: gRPC is designed to be interoperable, meaning it can work with a wide range of systems and services. This is beneficial for applications that need to integrate with existing systems or services, as it reduces the need for custom integrations.  <br>
**Security**: gRPC supports transport security with TLS, ensuring that data transmitted between the client and server is encrypted. This is crucial for applications that handle sensitive information. 
