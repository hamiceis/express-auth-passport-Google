import express from "express"
import session from "express-session"
import passport from "passport"

import "./auth" //configurações de autenticação do usuário
import { authRouter } from "./routes/auth.route"
import { profileRouter } from "./routes/profile.route"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Configura a sessão do express. A sessão é usada para manter o estado de autenticação entre solicitações HTTP.
app.use(session({
  secret: process.env.EXPRESS_SECRET_SESSION!, // Chave secreta usada para assinar o ID da sessão
  resave: false, // Evita que a sessão seja salva novamente se não foi modificada
  saveUninitialized: true // Salva novas sessões não inicializadas (sem dados) no armazenamento
}));

app.use(passport.initialize()) // Inicializa o Passport para autenticação
app.use(passport.session())  // Integra o Passport com a sessão do Express, permitindo a persistência da sessão de autenticação

app.use(authRouter)
app.use(profileRouter)

app.get("/", (req, res) => {
  res.status(200).send("Hello world")
})

app.listen(3333, () => {
  console.log("Server is running http://localhost:3333")
})