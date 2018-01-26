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
Sending build context to Docker daemon  8.704kB
Step 1/3 : FROM python:3-onbuild
# Executing 3 build triggers
 ---> Using cache
 ---> Using cache
 ---> Using cache
 ---> 9d83b68a12a1
Step 2/3 : EXPOSE 5000
 ---> Using cache
 ---> 43e3635b8545
Step 3/3 : CMD ["python", "./app.py"]
 ---> Using cache
 ---> 657f49929814
Successfully built 657f49929814
Successfully tagged vietlq/fun-static-site:latest
```

### Login into Docker Hub

```
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: vietlq
Password:
Login Succeeded
```

### Push your image to Docker Hub

https://docs.docker.com/docker-cloud/builds/repos/

```
$ docker push vietlq/fun-static-site
The push refers to repository [docker.io/vietlq/fun-static-site]
6eced465e1c6: Pushed
8bf0b52b92a6: Pushed
703a04d6e53a: Pushed
1c002af6dbb1: Mounted from library/python
6dce5c484bde: Mounted from library/python
057c34df1f1a: Mounted from library/python
3d358bf2f209: Mounted from library/python
0870b36b7599: Mounted from library/python
8fe6d5dcea45: Mounted from library/python
06b8d020c11b: Mounted from library/python
b9914afd042f: Mounted from library/python
4bcdffd70da2: Mounted from library/python
latest: digest: sha256:1b120424dec4b6ae88861cbd8b1005bb503fd84c14efe37c9c68d80c1cd491ab size: 2840
```
