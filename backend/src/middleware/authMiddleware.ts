import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {

  try {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      return res.status(500).json({
        message: "JWT secret missing"
      });
    }

    const payload = jwt.verify(
      token,
      secret
    ) as unknown as { userId: number };

    req.userId = payload.userId;

    next();

  }
  catch {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

}