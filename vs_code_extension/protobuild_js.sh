PROTOC_GEN_TS_PATH="$(pwd)/frontend/node_modules/ts-protoc-gen/bin/protoc-gen-ts"
OUT_DIR="$(pwd)/frontend/src"
PROTO_PATH="$(pwd)/protos/"
protoc --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}"  --ts_out="service=grpc-node,mode=grpc-js:${OUT_DIR}" --js_out="import_style=commonjs,binary:${OUT_DIR}"  --proto_path="${PROTO_PATH}"   ui.proto
protoc --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}"   --ts_out="service=grpc-web:${OUT_DIR}" --js_out="import_style=commonjs,binary:${OUT_DIR}"  --proto_path="${PROTO_PATH}"   ui.proto
