# Docker cheatsheet

The notes were extracted from https://docker-curriculum.com/ and https://docs.docker.com/engine/installation/linux/linux-postinstall/

### Pull a docker image

```
docker pull busybox
```

### Run command in docker image

```
docker run -it busybox echo "Hello"
docker run -it busybox sh
```

### Delete all exited images

```
docker rm $(docker ps -a -q -f status=exited)
```

### Delete the image after running

```
docker run --rm -it busybox echo "Yahoo"
```

### Expose ports of a docker image

```
$ docker run -P prakhar1989/static-site

$ docker port fe009ff63d78
443/tcp -> 0.0.0.0:32768
80/tcp -> 0.0.0.0:32769
```

Note that 32768 and 32769 were chosen randomly by the docker.

### Expose docker image ports via custom ports

```
docker run --rm -p 8888:80 prakhar1989/static-site
```

### Run docker image in detached mode & expose ports

```
docker run -d -P --name static-site prakhar1989/static-site
```

### Stop a running docker image

```
docker stop image_id
```

### Search for a docker image

```
docker search mongo
```
