FROM mongo:3.6

USER mongodb

CMD ["chown", "-R", "mongodb:mongodb", "/data/db", "/data/configdb"]
VOLUME /data/db /data/configdb

WORKDIR /data

EXPOSE 27017

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["mongod", "--port", "27017", "--smallfiles"]
