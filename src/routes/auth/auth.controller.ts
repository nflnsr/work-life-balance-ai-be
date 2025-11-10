import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async getAuths(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await this.authService.getAuths();

      console.log("Auth data fetched successfully:", auth);
      res.status(200).json(auth);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async createAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const newAuth = await this.authService.createAuth(data);

      console.log("New auth created successfully:", newAuth);
      res.status(201).json(newAuth);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}
