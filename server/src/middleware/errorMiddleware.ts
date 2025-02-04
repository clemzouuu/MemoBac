import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur",
  });
};

export default errorMiddleware;
