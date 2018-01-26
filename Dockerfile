FROM vietlq/vet-faucet-base:latest

COPY faucet /opt/vet-faucet
WORKDIR /opt/vet-faucet

RUN npm install

EXPOSE 8000

CMD ["/usr/local/bin/node", "index.js"]
