import { User } from "@prisma/client";
import { Router } from "express";

export const profileRouter = Router()

// Rota protegida que retorna o perfil do usuário autenticado
profileRouter.get("/profile", (req, res) => {
  if(req.isAuthenticated()) {
    const user = req.user as User
    return res.send(`Hello ${user.name}, your email: ${user.email}, your profilePicture: ${user.avatarUrl}`)
  } else {
    res.status(401).json({
      message: "Unauthorized"
    })
  }
})