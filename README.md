<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar ```pnpm install```
3. Tener Nest CLI instalado ```pnpm add -g @nestjs/cli```
4. Ejecutar la base de datos ```docker-compose up -d```
5. Configurar las variables de entorno en ```./.env```
6. Arrancar la aplicación en dev ```pnpm run start:dev```
6. Reconstruir la base de datos con la semilla ```GET - http://localhost:3000/api/seed```

## Stack
* React Router 7 - Framework mode
* Nest
* MongoDB

# Build para producción (con Docker)
1. Crear y configurar el archivo ```.env.prod```
2. Crear la imagen:

```
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```