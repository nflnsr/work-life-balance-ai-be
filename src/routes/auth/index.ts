// import { Router, Request, Response, NextFunction } from "express";
// // import { authenticate } from "~/middleware/authenticate";
// import { AuthRepository } from "./auth.repository";
// import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";

// const router = Router();

// const authRepository = new AuthRepository();
// const authService = new AuthService(authRepository);
// const authController = new AuthController(authService);

// router.get("/", (req: Request, res: Response, next: NextFunction) => {
//   return authController.getAuths(req, res, next);
// });

// router.post("/", (req: Request, res: Response, next: NextFunction) => {
//   return authController.createAuth(req, res, next);
// });

// export default router;
