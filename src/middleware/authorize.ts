// import { Request, Response, NextFunction } from "express";

// export const authorize =
//   (requiredRole: string) => (req: Request, res: Response, next: NextFunction) => {
//     const userRole = req.user?.roles;

//     if (!userRole) {
//       return res.status(403).json({ error: "Access denied. No role provided." });
//     }

//     if (userRole.includes(requiredRole) || userRole.includes("Admin")) {
//       return next();
//     }

//     return res.status(403).json({ error: "Access denied. Insufficient permissions." });
//   };
