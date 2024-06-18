import { Request, Response, NextFunction } from 'express';

//Middleware para proteção de rotas 
export function userAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
