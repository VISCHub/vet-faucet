#!/bin/bash

docker run -it -d --entrypoint mongod -v test_db:/data/db -v test_configdb:/data/configdb vietlq/vet-faucet-db
