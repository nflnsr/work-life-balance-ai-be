import { Register } from "./auth.type";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async getAuths() {
    return await this.authRepository.getAuths();
  }

  async createAuth(data: { register: Register }) {
    const isDuplicate = await this.authRepository.checkDuplicateAuth(data.register);

    if (isDuplicate) {
      throw new Error("Duplicate auth exists");
    }

    return await this.authRepository.createAuth(data);
  }
}
