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

Now check the web URL: https://cloud.docker.com/swarm/vietlq/repository/docker/vietlq/fun-static-site/general

And fetch on another machine to verify that it works:

```
$ docker run --rm -p 8888:5000 vietlq/fun-static-site
Unable to find image 'vietlq/fun-static-site:latest' locally
latest: Pulling from vietlq/fun-static-site
f49cf87b52c1: Pull complete
7b491c575b06: Pull complete
b313b08bab3b: Pull complete
51d6678c3f0e: Pull complete
09f35bd58db2: Pull complete
0f9de702e222: Pull complete
73911d37fcde: Pull complete
99a87e214c92: Pull complete
636f90eed4e0: Pull complete
56dee1fc423a: Pull complete
f83d9eb03019: Pull complete
28293e65d724: Pull complete
Digest: sha256:1b120424dec4b6ae88861cbd8b1005bb503fd84c14efe37c9c68d80c1cd491ab
Status: Downloaded newer image for vietlq/fun-static-site:latest
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
```

### List docker network interfaces

```
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
ae3849714d44        bridge              bridge              local
c0eca36c3104        host                host                local
fb98513833a6        none                null                local
```

### Create custom docker network

```
$ docker network create foodtrucks
a6e2aeed08ff7f334234265e5e6536046e5bc140a02133cfc1ba892558702e52
vietlq@Viets-iMac:~/projects/VISC/vet-faucet/docker-practice/based-on-ubuntu[15:10:46]>
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
ae3849714d44        bridge              bridge              local
a6e2aeed08ff        foodtrucks          bridge              local
c0eca36c3104        host                host                local
fb98513833a6        none                null                local
```

### Run docker image inside a docker network

```
docker run -dp 9200:9200 --net foodtrucks --name es elasticsearch
```

Also deamonize it and give it a name.

### Inspect a docker network

```
$ docker network inspect foodtrucks
[
    {
        "Name": "foodtrucks",
        "Id": "a6e2aeed08ff7f334234265e5e6536046e5bc140a02133cfc1ba892558702e52",
        "Created": "2018-01-26T15:10:48.846844639Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
```
