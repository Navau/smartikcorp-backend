<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Testlo Shop API
1. Clonar proyecto
2. Ejecutar ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```
#### Si es que se utiliza ```.env.dev``` y ```docker-compose.dev.yaml```
```
docker-compose -f docker-compose.dev.yaml --env-file .env.dev up -d
```
6. Ejecutar SEED
```
http://localhost:8000/api/seed
```
7. Levantar servidor ```yarn start:dev```
