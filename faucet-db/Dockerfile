FROM mongo:3.6

USER mongodb

VOLUME /data/db /data/configdb

WORKDIR /data

EXPOSE 27017

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["mongod"]
