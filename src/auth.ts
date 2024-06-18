import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./lib/prisma";

import { User } from "@prisma/client";

// Configura a estratégia de autenticação do Google OAuth 2.0
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID! ?? "GOOGLE_CLIENT_ID",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET! ?? "GOOGLE_CLIENT_SECRET",
  callbackURL: "/auth/google/callback", //URL de callback para onde o Google redireciona após a autenticação
}, async (accessToken, refreshToken, profile, done) => {

  // // Extrai informações do perfil retornado pelo Google
  const { id, displayName, emails, photos } = profile
  const email = emails?.[0].value
  const avatarUrl = photos?.[0].value

    // Verifica se o email foi fornecido  
  if(!email) {
    return done(new Error("No email provided"), undefined)
  }

  // Procura um usuário existente no banco de dados pelo providerId (ID do Google)
  let user = await prisma.user.findFirst({
    where: {
      providerId: id
    }
  })

  // Se o usuário existir, atualiza as informações dele
  if(user) {
    user = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email,
        name: displayName,
        avatarUrl
      }
    })
  } else {
    // Se o usuário não existir, cria um novo registro no banco de dados
    user = await prisma.user.create({
      data: {
        name: displayName,
        email,
        avatarUrl,
        providerId: id,
        provider: "google"
      }
    })
  }
  // Finaliza o processo de autenticação passando o usuário para o Passport
  return done(null, user)
}))


/*
serializeUser: Este método é chamado quando um usuário é autenticado. Ele determina o que será armazenado na sessão. Geralmente, apenas o identificador único do usuário (por exemplo, id) é armazenado.
*/

// Serializa o usuário para armazenar apenas o ID na sessão
passport.serializeUser((user, done) => {
  done(null, (user as User).id)
})

/*
deserializeUser: Este método é chamado em cada solicitação subsequente para recuperar o usuário completo com base no identificador armazenado na sessão. Ele pega o identificador do usuário e consulta o banco de dados para buscar as informações completas do usuário.
*/

// Desserializa o usuário buscando o ID armazenado na sessão e consultando o banco de dados para obter as informações completas do usuário
passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findUnique({ 
    where: {
      id
    }
  })
  done(null, user)
})