# syntax=docker/dockerfile:1
FROM ubuntu:20.04
WORKDIR /my_own_docker_container
RUN apt update
RUN apt install nodejs -y
RUN echo ls
# CMD ["node", "src/routes.js"]
EXPOSE 8080