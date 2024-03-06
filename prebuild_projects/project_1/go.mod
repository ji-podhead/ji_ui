module ji_ui

go 1.20

require (
	github.com/golang/protobuf v1.5.3 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20240228224816-df926f6c8641 // indirect
	google.golang.org/grpc v1.62.0
	google.golang.org/protobuf v1.33.0 // indirect
	protos/ji_ui v1.0.0
)

replace protos/ji_ui => ./protos

require (
	golang.org/x/net v0.21.0 // indirect
	golang.org/x/sys v0.17.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	google.golang.org/grpc/cmd/protoc-gen-go-grpc v1.3.0 // indirect
)
