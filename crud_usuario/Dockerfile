FROM node:14.16.1

LABEL version="1.0"
LABEL description="crud de usuarios desarrollado en React jsx."
LABEL maintainer = ["gemacostzhd@hotmail.com", "gemazh20@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
