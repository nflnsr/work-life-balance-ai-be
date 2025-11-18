import { User } from "@/routes/user/user.type";
import { verifyAccessToken } from "@/utils/jwt";
import { Request, Response, NextFunction } from "express";

declare module "express" {
  export interface Request {
    user?: User;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // const accessToken = req.headers.cookie?.split("; ").find(cookie => cookie.startsWith("accessToken="))?.split("=")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ status: "error", message: "Authorization header missing or invalid" });
    return;
  }

  const accessToken = authHeader.split(" ")[1];

  const user = verifyAccessToken(accessToken!);

  req.user = user as User;

  if (user === null) {
    res.status(401).json({ status: "error", message: "Invalid token" });
    return;
  }
  next();
};
