#!/bin/bash

docker build -t vietlq/vet-faucet .
docker run -it -d -p 8000:8000 -v configs:/opt/vet-faucet/configs:ro vietlq/vet-faucet
