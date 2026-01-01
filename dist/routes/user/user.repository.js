"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../../utils/prisma");
class UserRepository {
    async getUsers() {
        try {
            const users = await prisma_1.prisma.user.findMany({
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
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
    async getUsersId() {
        try {
            const users = await prisma_1.prisma.user.findMany({
                select: {
                    id: true,
                },
            });
            return users;
        }
        catch (error) {
            console.error("Error fetching user IDs:", error);
            throw error;
        }
    }
    async getProfile(userId) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
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
                    createdAt: true,
                },
            });
            if (!user)
                return null;
            return user;
        }
        catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }
    async createUser(data) {
        try {
            return await prisma_1.prisma.user.create({
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
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
    async loginUser(email) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
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
        }
        catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        }
    }
    async checkEmailExists(email) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            return !!user;
        }
        catch (error) {
            console.error("Error checking email existence:", error);
            throw error;
        }
    }
    async checkPhoneExists(phone) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { phone },
            });
            return !!user;
        }
        catch (error) {
            console.error("Error checking phone existence:", error);
            throw error;
        }
    }
    async getFeedback(userId) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
            });
            return user ? user.feedback : null;
        }
        catch (error) {
            console.error("Error fetching user feedback:", error);
            throw error;
        }
    }
    async updateFeedback(userId, feedback) {
        try {
            return await prisma_1.prisma.user.update({
                where: { id: userId },
                data: { feedback },
            });
        }
        catch (error) {
            console.error("Error updating user feedback:", error);
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
