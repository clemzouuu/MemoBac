import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "MYSTERE";

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
       res.status(401).json({ message: "Accès non autorisé" });
      return;
  }

  try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
 
      if (!decoded || !decoded.userId) {
           res.status(403).json({ message: "Token invalide" });
          return;
      }

      (req as any).user = decoded;
 
      next();
  } catch (err) {
       res.status(403).json({ message: "Token invalide" });
  }
};



export default authMiddleware;
