##!/bin/bash

# Laden Sie die Konfigurationsdateien, um die Umgebungsvariable PATH zu setzen
source ~/.bashrc
# oder
source ~/.bash_profile

# Navigieren Sie zum Projektverzeichnis
#cd /kubyplexer/kubygo

# Führen Sie air aus
air
GOPATH=~/go ; export GOPATH
cd $GOPATH/src/github.com/improbable-eng/grpc-web
protoc -I=./protos --plugin=protoc-gen-grpc-web=$GOPATH/src/github.com/improbable-eng/grpc-web --js_out=import_style=commonjs:./protos --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./protos ./protos/ui.proto
