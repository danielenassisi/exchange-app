#!/bin/bash

PROTO_DEST=./proto


yarn grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:${PROTO_DEST} \
--grpc_out=grpc_js:${PROTO_DEST} \
-I ./proto \
proto/*.proto

grpc_tools_node_protoc \
--plugin=protoc-gen-ts=../bin/protoc-gen-ts \
--ts_out=grpc_js:${PROTO_DEST} \
-I ./proto \
proto/*.proto