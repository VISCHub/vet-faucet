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

### Build your own image

Base your image on python:3-onbuild, expose port 5000, and run a Flask application.

```
$ cat <<EOF > Dockerfile
# Base/parent image
FROM python:3-onbuild

# Expose port 5000, default port for Flask
EXPOSE 5000

# Run the application
CMD ["python", "./app.py"]
EOF
```

```
$ docker build -t vietlq/fun-static-site .
Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM python:3-onbuild
3-onbuild: Pulling from library/python
f49cf87b52c1: Pull complete
7b491c575b06: Pull complete
b313b08bab3b: Pull complete
51d6678c3f0e: Pull complete
09f35bd58db2: Pull complete
0f9de702e222: Pull complete
73911d37fcde: Pull complete
99a87e214c92: Pull complete
636f90eed4e0: Pull complete
Digest: sha256:e8ecacdcdd9395220297fc416ef8307e748de60b4d8de07c341aea19a90838d1
Status: Downloaded newer image for python:3-onbuild
# Executing 3 build triggers
COPY failed: stat /var/lib/docker/tmp/docker-builder661160443/requirements.txt: no such file or directory
```

### Login into Docker Hub

```
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: vietlq
Password:
Login Succeeded
```
