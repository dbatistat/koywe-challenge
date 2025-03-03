# Proyecto NestJS

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (Versión 20.12.1 o superior)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (Opcional si se ejecuta con Docker)

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
cp .env.example .env
```

Asegúrate de configurar correctamente las variables de entorno en `.env`, especialmente las relacionadas con la base de datos.

## Levantar la Aplicación

### Opción 1: Ejecutar la Aplicación con Docker

Si deseas ejecutar la aplicación en contenedores junto con la base de datos, usa Docker Compose:

```bash
docker-compose up --build
```

Esto:
- Construirá la imagen del proyecto.
- Levantará un contenedor con PostgreSQL configurado.
- Aplicará automáticamente las migraciones de Prisma.
- Iniciará la aplicación.

### Opción 2: Ejecutar la Aplicación Localmente

Si prefieres ejecutar la aplicación sin Docker, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install  # O usa npm install o yarn install
   ```

2. Asegúrate de tener una instancia de PostgreSQL en ejecución y configurada en el archivo `.env`.

3. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

4. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start:dev  # O usa npm run start:dev o yarn start:dev
   ```

## Ejecutar Pruebas

Para ejecutar las pruebas unitarias y de integración:

```bash
npm test  # O npm run test o yarn test
```

Para ejecutar pruebas con cobertura:

```bash
npm test:cov  # O npm run test:cov o yarn test:cov
```

## Variables de Entorno

El archivo `.env.example` proporciona un ejemplo de las variables necesarias para ejecutar la aplicación:

```ini
PORT=3000
EXPIRATION=300000
CRYPTOMKT_API_URL=https://api.exchange.cryptomkt.com
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/koywe
JWT_SECRET=my_secret_key
```

Asegúrate de definir estas variables correctamente antes de ejecutar la aplicación.

## Base de Datos

Este proyecto utiliza **PostgreSQL** como base de datos.

Si usas Docker, el servicio de PostgreSQL se levantará automáticamente con `docker-compose up`.
Si ejecutas localmente, asegúrate de tener PostgreSQL instalado y configurado correctamente.

Crea la base de datos:
```bash
CREATE DATABASE koywe;
```

## Dockerización

El proyecto incluye un `Dockerfile` y un `docker-compose.yml` para facilitar el despliegue con Docker.

### Construcción Manual de la Imagen
Si prefieres construir la imagen manualmente:
```bash
docker build -t nestjs-app .
```

### Levantar Contenedores con Docker Compose
```bash
docker-compose up --build
```

Este comando iniciará la aplicación junto con PostgreSQL en contenedores.

------------

# Guía de Pruebas de Endpoints

## 1. Registro de Usuario
Antes de realizar cualquier prueba, es necesario registrar un usuario y obtener un token de autenticación.

### Endpoint
**POST** `http://localhost:3000/auth/register`

### Body
```json
{
  "email": "dbatista.t@gmail.com",
  "name": "David",
  "password": "1234"
}
```

### Respuesta
```json
{
    "id": "b340817f-c430-4783-928b-b0d08322086c",
    "email": "dbatista.tt@gmail.com",
    "name": "David",
    "createdAt": "2025-03-03T03:18:17.596Z"
}
```

---

## 2. Inicio de Sesión
Utilizar este endpoint para obtener un token que será necesario en las siguientes llamadas.

### Endpoint
**POST** `http://localhost:3000/auth/login`

### Body
```json
{
  "email": "dbatista.tt@gmail.com",
  "password": "1234"
}
```

### Respuesta
```json
{
    "id": "b340817f-c430-4783-928b-b0d08322086c",
    "email": "dbatista.tt@gmail.com",
    "name": "David",
    "createdAt": "2025-03-03T03:18:17.596Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzNDA4MTdmLWM0MzAtNDc4My05MjhiLWIwZDA4MzIyMDg2YyIsImVtYWlsIjoiZGJhdGlzdGEudHRAZ21haWwuY29tIiwiaWF0IjoxNzQwOTcxOTEyLCJleHAiOjE3NDA5NzU1MTJ9.OzsJ8l1RmgwkU7ZBiGPC0gWWb5sCyxxq1mnIBd-V9ro"
}
```

---

## 3. Crear una Cotización
Este endpoint permite crear una cotización de conversión de moneda.

### Endpoint
**POST** `http://localhost:3000/quote`

### Headers
- `Authorization`: `Bearer <token_obtenido_en_login>`

### Body
```json
{
  "amount": 10000,
  "from": "ARS",
  "to": "ETH"
}
```

### Respuesta
```json
{
    "id": "58dabfa0-be56-4226-9b80-684ad057559d",
    "from": "ARS",
    "to": "ETH",
    "amount": "10000",
    "rate": "0.0000003357106684318334",
    "convertedAmount": "0.003357106684318334",
    "timestamp": "2025-03-03T03:18:49.645Z",
    "expiresAt": "2025-03-03T03:23:49.645Z"
}
```

---

## 4. Obtener una Cotización por ID
Este endpoint permite obtener una cotización previamente creada usando su ID.

### Endpoint
**GET** `http://localhost:3000/quote/58dabfa0-be56-4226-9b80-684ad057559d`

### Headers
- `Authorization`: `Bearer <token_obtenido_en_login>`

### Respuesta
```json
{
    "id": "58dabfa0-be56-4226-9b80-684ad057559d",
    "from": "ARS",
    "to": "ETH",
    "amount": "10000",
    "rate": "0.0000003357106684318334",
    "convertedAmount": "0.003357106684318334",
    "timestamp": "2025-03-03T03:18:49.645Z",
    "expiresAt": "2025-03-03T03:23:49.645Z"
}
```

---

## Notas
- Se debe utilizar el token obtenido en el login para autenticar las peticiones protegidas (`quote`).
- La cotización tiene un tiempo de expiración (`expiresAt`), después del cual no será válida.
- Si una cotización expira, se deberá crear una nueva para obtener la tasa de conversión actualizada.


-----------

## Herramientas de IA Utilizadas
Durante el desarrollo de este proyecto, se utilizaron las siguientes herramientas de IA para agilizar el proceso:

* ChatGPT: Se utilizó para generar código, validaciones de entrada y salida, y para obtener sugerencias sobre la estructura del proyecto. También se uso para mejorar este documento.

* Deepseek: Se empleó para optimizar la lógica de negocio y mejorar la eficiencia del código. Además se uso para la creación y corrección de los archivos de Docker y Docker compose.

* GitHub Copilot: Se usó para autocompletar código, generar pruebas unitarias y sugerir mejores prácticas de programación.

Estas herramientas ayudaron a acelerar el desarrollo, mejorar la calidad del código y asegurar que las validaciones de entrada y salida fueran robustas y eficientes.
