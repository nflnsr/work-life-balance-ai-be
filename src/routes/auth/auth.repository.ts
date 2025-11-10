import { prisma } from "../../utils/prisma";
import { Register } from "./auth.type";

export class AuthRepository {
  async getAuths() {
    try {
      return await prisma.users.findMany();
    } catch (error) {
      console.error("Error fetching auths:", error);
      throw error;
    }
  }

  async checkDuplicateAuth(auth: any) {
    try {
      const existingAuth = await prisma.users.findFirst({
        where: {
          email: auth.email,
        },
      });
      return existingAuth !== null;
    } catch (error) {
      console.error("Error checking duplicate auth:", error);
      throw error;
    }
  }

  async createAuth(data: { register: Register }) {
    try {
      return await prisma.users.create({
        data: {
          email: data.register.email,
          name: data.register.name,
          password: data.register.password,
        },
      });
    } catch (error) {
      console.error("Error creating auth:", error);
      throw error;
    }
  }
}
