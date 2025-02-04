import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const secretKey = "SECRET_KEY"; 
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey) as jwt.JwtPayload;
    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
};

export default authMiddleware;
