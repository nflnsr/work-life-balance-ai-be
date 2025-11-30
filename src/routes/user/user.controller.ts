import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { responseBuilder } from "@/utils/response-handler";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUsers();

      if (!users) {
        res.status(404).json({ error: "No users found" });
        return;
      }

      responseBuilder.success({ res, data: users });
      return;
    } catch (error) {
      responseBuilder.internalServerError({ res });
      return;
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);

      const user = await this.userService.getProfile(userId);

      if (!user) {
        responseBuilder.notFound({ res, message: "User not found" });
        return;
      }

      responseBuilder.success({ res, data: user });
      return;
    } catch (error) {
      responseBuilder.internalServerError({ res });
      return;
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const newUser = await this.userService.createUser(data);

      responseBuilder.created({ res, data: newUser });
      return;
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const user = await this.userService.loginUser(data);
      if (!user) {
        responseBuilder.unauthorized({ res, message: "Invalid email or password" });
        return;
      }

      const { password, ...userData } = user;

      const accessToken = generateAccessToken(userData);
      const refreshToken = generateRefreshToken(userData);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      responseBuilder.success({ res, data: { user: userData, accessToken, refreshToken } });
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

      responseBuilder.internalServerError({ res, message: errorMessage });
      return;
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        responseBuilder.unauthorized({ res, message: "Refresh token missing" });
        return;
      }

      const user = verifyRefreshToken(refreshToken);
      if (!user) {
        responseBuilder.unauthorized({ res, message: "Invalid refresh token" });
        return;
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      responseBuilder.success({
        res,
        data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken");

      responseBuilder.success({ res, data: { message: "Logout successful" } });
      return;
    } catch (error) {
      responseBuilder.internalServerError({ res });
      return;
    }
  }

  async getFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const feedback = await this.userService.getFeedback(userId);
      responseBuilder.success({ res, data: feedback });
      return;
    } catch (error) {
      responseBuilder.internalServerError({ res });
      return;
    }
  }

  async updateFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const { feedback } = req.body;
      const updatedUser = await this.userService.updateFeedback(userId, feedback);

      responseBuilder.success({ res, data: updatedUser });
      return;
    } catch (error) {
      responseBuilder.internalServerError({ res });
      return;
    }
  }
}
