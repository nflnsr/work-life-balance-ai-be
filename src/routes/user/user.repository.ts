import { prisma } from "../../utils/prisma";
import { User } from "./user.type";

export class UserRepository {

  async getUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          gender: true,
          age: true,
          isStudent: true,
          field: true,
          hobbies: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async getProfile(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          gender: true,
          age: true,
          isStudent: true,
          field: true,
          hobbies: true,
          hasAnsweredQuestionnaire: true,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  async createUser(data: User) {
    try {
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          gender: data.gender,
          age: data.age,
          isStudent: data.isStudent,
          field: data.field,
          hobbies: data.hobbies,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async loginUser(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          phone: true,
          gender: true,
          age: true,
          isStudent: true,
          field: true,
          hobbies: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  async checkEmailExists(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return !!user;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  }

  async checkPhoneExists(phone: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { phone },
      });
      return !!user;
    } catch (error) {
      console.error("Error checking phone existence:", error);
      throw error;
    }
  }
}
