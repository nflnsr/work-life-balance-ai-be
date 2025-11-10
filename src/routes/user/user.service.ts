import { comparePassword, hashPassword } from "@/utils/bcrypt";
import { HttpException } from "@/utils/http-exeption";
import { UserRepository } from "./user.repository";
import { User } from "./user.type";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getProfile(userId: number) {
    return await this.userRepository.getProfile(userId);
  }

  async createUser(data: User) {
    const emailAlreadyExist = await this.userRepository.checkEmailExists(data.email);
    const phoneAlreadyExist = await this.userRepository.checkPhoneExists(data.phone);

    if (emailAlreadyExist) {
      throw new HttpException(409, "client_error", "Email already exists");
    }
    if (phoneAlreadyExist) {
      throw new HttpException(409, "client_error", "Phone number already exists");
    }

    const { password, ...userData } = data;
    const hashedPassword = await hashPassword(password);

    return await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }

  async loginUser({email, password}: {email: string, password: string}) {
    const isUserExist = await this.userRepository.checkEmailExists(email);
    if (!isUserExist) {
      throw new Error("User not found");
    }

    const user = await this.userRepository.loginUser(email);

    if (!(await comparePassword(password, user?.password as string))) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}
