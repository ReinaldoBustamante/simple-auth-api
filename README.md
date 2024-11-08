# Simple Auth API

Se desarrolló una API REST que permite la autenticación de usuarios mediante tokens JWT. Para su implementación se utilizaron las siguientes tecnologías:

- **Node.js**: como entorno de ejecución para el backend.

- **TypeScript**: para aprovechar un tipado estricto.

- **Express**: como framework para la creación de rutas y manejo de peticiones.

- **Prisma**: como ORM para facilitar la interacción con la base de datos.

- **PostgreSQL**: como sistema de gestión de bases de datos relacional.

Además, se configuró un archivo docker-compose para facilitar la creación y configuración rápida de una base de datos PostgreSQL en un entorno de desarrollo.


## Instrucciones

### 1 - Instalar Docker
Para instalar Docker, puedes seguir la documentación oficial disponible en [Docker Documentation](https://www.docker.com/)

### 2 - Instalar depedencias del proyecto
Primero, deberás clonar el proyecto mediante el siguiente comando:
```
    git clone https://github.com/ReinaldoBustamante/simple-auth-api.git
```
Luego, debes posicionarte en la carpeta del proyecto con:
```
    cd simple-auth-api
```
Una vez dentro del directorio, instala las dependencias con:
```
    npm i
``` 
### 3 - Inicializar variables de entorno
Es necesario configurar las variables de entorno correspondientes a la base de datos. Estas variables son las que utiliza el archivo ``docker-compose.yml`` para crear la base de datos al iniciarse, además de la URL para establecer la conexión mediante Prisma.
```
POSTGRES_DB       = Nombre de la base de datos
POSTGRES_USER     = Usuario para acceder a la base de datos
POSTGRES_PASSWORD = Contraseña para acceder a la base de datos
DATABASE_URL      = "postgresql://user:password@localhost:5432/db_name?schema=public"
```
### 4 - Inicializar servicios de Docker
Para inicializar los servicios definidos en el archivo docker-compose.yml, ejecuta el siguiente comando:
```
    docker compose up -d
```

 Ejecutar el comando npm run migrate

- Ejecutar el proyecto con npm run dev

- al interactuar con la api puedes usar postman la url es http://localhost:3000/api

## Endpoints

### Publicos

- POST /auth/register
- POST /auth/login
- GET /auth/validate/{token}

## Requiere autentificación (JWT)
- GET /users