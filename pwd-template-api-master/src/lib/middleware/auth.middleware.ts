import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = (roles?: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;
      req.user = decoded;

      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "invalid token" });
    }
  };
};
