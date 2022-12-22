FROM ubuntu:20.04
WORKDIR /app
COPY . .
RUN apt update
RUN apt install ufw -y
RUN ufw allow 8080
RUN apt install nodejs -y
RUN apt install npm -y
RUN npm install --global yarn -y
RUN yarn install
# RUN yarn start
CMD ["yarn", "start"]
EXPOSE 3000