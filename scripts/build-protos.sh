#!/bin/bash

yarn run grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./proto_build --grpc_out=grpc_js:./proto_build --ts_out=grpc_js:./proto_build -I ../protos ../protos/*.proto