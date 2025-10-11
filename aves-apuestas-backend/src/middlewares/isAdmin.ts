import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado. Solo administradores" });
  }
  next();
};

