FROM vietlq/vet-faucet-base:latest

COPY faucet /opt/vet-faucet
WORKDIR /opt/vet-faucet
VOLUME /opt/vet-faucet/configs

RUN npm install

EXPOSE 8000

CMD ["/usr/local/bin/node", "index.js"]
