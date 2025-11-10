// import { RoleRepository } from "./role.repository";
// import { RoleList } from "./role.type";

// export class RoleService {
//   private roleRepository: RoleRepository;

//   constructor(roleRepository: RoleRepository) {
//     this.roleRepository = roleRepository;
//   }

//   async getRoles() {
//     return await this.roleRepository.getRoles();
//   }

//   async createRole(data: { role: RoleList }) {
//     const isRoleExist = await this.roleRepository.checkRoleExists(data.role);
//     if (isRoleExist) {
//       throw new Error("Role already exists");
//     }

//     return await this.roleRepository.createRole(data);
//   }

//   async assignRoleToUser(userId: number, roleId: number) {
//     return await this.roleRepository.assignRoleToUser(userId, roleId);
//   }
// }
