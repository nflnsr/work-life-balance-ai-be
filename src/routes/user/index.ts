import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../../middleware/authenticate";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { validate } from "@/middleware/validate";
import { registerSchema } from "@/validator/register";
import { loginSchema } from "@/validator/login";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.getUsers(req, res, next);
}); 

router.get("/profile", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.getProfile(req, res, next);
});

router.post("/register", validate(registerSchema), (req: Request, res: Response, next: NextFunction) => {
  return userController.createUser(req, res, next);
});

router.post("/login", validate(loginSchema), (req: Request, res: Response, next: NextFunction) => {
  return userController.loginUser(req, res, next);
});

router.post("/logout", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.logoutUser(req, res, next);
});

router.post("/refresh-token", (req: Request, res: Response, next: NextFunction) => {
  return userController.refreshToken(req, res, next);
});

router.get("/feedback", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.getFeedback(req, res, next);
});

router.post("/feedback", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.updateFeedback(req, res, next);
});

export default router;
