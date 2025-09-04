## Introdução ao Docker

Objetivo: Praticar a criação de projeto Back-End com o CRUD completo de Usuário e Produtos utilizando

### Tecnologias Utilizadas

- NestJS
- Prisma(ORM)
- PostgresSql(Database)
- Jest(Testes)
- Docker
- Swagger

## Instalação 

Clone o arquivo com:

```bash
git clone git@github.com:JonatasMarquesS09/introducao-docker.
```

Logo após utilize esse comando para baixar todas as dependências: 

```bash
npm install
```

Caso não de certo baixe as dependências manualmente:

```bash
npm install @nestjs/passport passport passport-jwt 
npm install @nestjs/swagger swagger-ui-express
npm install bcrypt
npm install class-transformer class-validator
npm install @nestjs/jwt 
npm install prisma @prisma/client
npm install @nestjs/common @nestjs/config
npm install @nestjs/core
```
Obs: Instale uma linha de cada vez

## Configuração

### 1 - Instalação do banco de dados 

Primeiro abra seu arquivo .env e configure dessa forma:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb"
DATABASE_URL_CONTAINER="postgresql://postgres:postgres@postgres:5432/nestdb"

API_PORT=3000
API_PORT_FRONT=3001

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nestdb
POSTGRES_PORT=5432

SECRET_KEY="De sua preferencia"
```

Logo depois vai ao arquivo docker-compose.yml e coloque:

- Para o container do Banco de dados

```bash
services:

  postgres:
    image: postgres
    container_name: postgresDB
    env_file: .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "${POSTGRES_PORT}:${POSTGRES_PORT}"
```

- Para o container da Api

```bash
api:
    build: 
      context: .
      dockerfile: Dockerfile.api
    container_name: nest_api
    env_file: .env
    ports:
      - "${API_PORT_FRONT}:${API_PORT}"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: ${DATABASE_URL_CONTAINER}
    command: sh -c "npx prisma migrate deploy && npm run start:prod"
```
Agora abra seu Dockerfile.api e coloque:

```bash
FROM node:20-alpine
WORKDIR /app
COPY package.json /.
COPY package-lock.json /.
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
```

Pronto seu Banco de dados está feito, agora use:

```bash
docker-compose up --build
```

Para criar seus containes

### 2 -  Rodando sua aplicação

Após a configuração do banco de dados utilize:

```bash
npx prisma migrate dev
npx prisma generate
```

Para gerar seu Prisma Client

Agora use: 

```bash
npm run build
```

Para construir sua aplicação

E pronto sua aplicação está funcionando

## Ùltimo passo

Agora é só ligar seu container no docker e sua api vai está em:

```bash
http://localhost:3001/api
```

## Informaçãoes 

### Endpoints

Usuários(User)

- GET /user => Listar todos os usuários
- GET /user/:id => Listar usários por id
- PUT /user/:id => Atualizar um usários
- DELETE /user/:id => Deletar um usuário
- POST /auth/register => Registra um usuário
- POST /auth/login => Loga um usuário

Produtos(product)

- POST /produtos => Criar um produto
- GET /produtos => Listar todos os produtos
- GET /produtos/:id => Listar um produto por id
- PUT /produtos/:id => Atualizar um produtos
- DELETE /produtos/:id => Deletar um produto

## Agradecimnetos

Obrigado por dá uma olhada no meu arquivo, qualquer contribuição serão bem vindas

Se quiser entrar em contato aqui está meu linkedin:

https://www.linkedin.com/in/jonatas-marques-sousa-591632382/

Muito obrigado❤️

Ass: Jonatas Marques