FROM vietlq/vet-faucet-base:latest

COPY faucet /opt/vet-faucet
WORKDIR /opt/vet-faucet
ADD configs/config.json /opt/vet-faucet/configs/config.json

RUN npm install

EXPOSE 8000

CMD ["/usr/local/bin/node", "index.js"]
