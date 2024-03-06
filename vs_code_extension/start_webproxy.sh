GOPATH=~/go ; export GOPATH
cd $GOPATH/src/github.com/improbable-eng/grpc-web
protoc -I=./protos --plugin=protoc-gen-grpc-web=$GOPATH/src/github.com/improbable-eng/grpc-web --js_out=import_style=commonjs:./protos --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./protos ./protos/ui.proto
