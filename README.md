## APLICAÇÃO BACK-END COM NODEJS, QUE ULTILIZA O EPRESS, PRISMA ORM, PASSPORT E TYPESCRIPT

### Techs

- Node.js
- Express 
- PrismaORM 
- Passport 
- TypeScript

### Banco de dados SQLite


## Configuração do Projeto




### Instalar depedências

```
 npm install
```

### Configurar as variáveis ambiente

```
EXPRESS_SECRET_SESSSION="suaSecret"
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
```


### Configuração do Prisma

```
npx prisma migrate dev --name init
npx prisma generate
```


#### Iniciar o servidor

```
  npm run dev
```

### ROTAS da aplicação


#### Processo de cadastro/login 

```
GET http://localhost:3000/auth/google
```

#### Verificar se o usuário está logado, retornando os dados 

```
GET http://localhost:3000/profile
```


#### LOGOUT 

```
GET http://localhost:3000/logout
```


## ESTRUTURA DE PASTAS

```
node-express-prisma-passport/
├── prisma/
│   └── schema.prisma
├── src/
│   ├──lib/
│   │   ├── prisma.ts
│   ├── auth.ts
│   ├── app.ts
│   ├── middleware.ts
│   │
│   ├── routes/
│   │   ├── auth.ts
│   │   └── profile.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── node_modules/
```