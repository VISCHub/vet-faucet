#!/bin/bash

# Build the container
docker build -t vietlq/copy-food-trucks .

# Create Docker network
docker network create foodtrucks

# Launch the Elastic Search in the network
docker run -d --net foodtrucks -p 9200:9200 -p 9300:9300 --name es elasticsearch

# Start the Flask app container
docker run -d --net foodtrucks -p 5000:5000 --name foodtrucks-web vietlq/copy-food-trucks
