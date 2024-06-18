import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

// Iniciar o processo de login/cadastro com Google OAuth
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback após autenticação
authRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redireciona para o perfil após sucesso na autenticação
    res.redirect('/profile');
  }
);

//Rota de Logout
authRouter.get("/logout", (req, res, next) => {
  // req.logout() para remover req.user e encerrar a sessão do usuário.
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    //req.session.destroy() é chamado para destruir a sessão completamente, garantindo que todos os dados da sessão sejam removidos.
    req.session.destroy((err) => {
      if(err) {
        return next(err)
      }
      res.json({ message: "Logged out Successfully!"})
    })
  })
})