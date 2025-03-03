# Usa una imagen base de Node.js 20.12.1
FROM node:20.12.1-alpine

# Instala dependencias necesarias para compilar módulos nativos como bcrypt
RUN apk add --no-cache --virtual .build-deps gcc g++ make python3

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json (o yarn.lock) para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila el proyecto de NestJS
RUN npm run build

# Expone el puerto en el que se ejecutará la app
EXPOSE 3000

# Comando para ejecutar la aplicación NestJS
CMD ["npm", "run", "start:prod"]
