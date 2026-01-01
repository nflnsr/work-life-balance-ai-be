"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("@/utils/bcrypt");
const http_exeption_1 = require("@/utils/http-exeption");
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers() {
        return await this.userRepository.getUsers();
    }
    async getUsersId() {
        return await this.userRepository.getUsersId();
    }
    async getProfile(userId) {
        return await this.userRepository.getProfile(userId);
    }
    async createUser(data) {
        const emailAlreadyExist = await this.userRepository.checkEmailExists(data.email);
        const phoneAlreadyExist = await this.userRepository.checkPhoneExists(data.phone);
        if (emailAlreadyExist) {
            throw new http_exeption_1.HttpException(409, "client_error", "Email already exists");
        }
        if (phoneAlreadyExist) {
            throw new http_exeption_1.HttpException(409, "client_error", "Phone number already exists");
        }
        const { password, ...userData } = data;
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        return await this.userRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
    }
    async loginUser({ email, password }) {
        const isUserExist = await this.userRepository.checkEmailExists(email);
        if (!isUserExist) {
            throw new Error("User not found");
        }
        const user = await this.userRepository.loginUser(email);
        if (!(await (0, bcrypt_1.comparePassword)(password, user?.password))) {
            throw new Error("Invalid email or password");
        }
        return user;
    }
    async getFeedback(userId) {
        return await this.userRepository.getFeedback(userId);
    }
    async updateFeedback(userId, feedback) {
        return await this.userRepository.updateFeedback(userId, feedback);
    }
}
exports.UserService = UserService;
