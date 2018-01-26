# Docker cheatsheet

### Run command in docker image

```
docker run -it busybox echo "Hello"
docker run -it busybox sh
```

### Delete all exited images

```
docker rm $(docker ps -a -q -f status=exited)
```
