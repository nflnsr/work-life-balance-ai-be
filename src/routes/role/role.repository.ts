// import { prisma } from "../../utils/prisma";
// import { RoleList } from "./role.type";
// // import { GetRoleById } from "./role.type";

// export class RoleRepository {
//   async getRoles() {
//     try {
//       const roles = await prisma.role.findMany()

//       return roles;
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       throw error;
//     }
//   }

//   async createRole(data: {
//     role: RoleList;
//   }) {
//     try {
//       return await prisma.role.create({
//         data: {
//           role: data.role,
//         },
//       });
//     } catch (error) {
//       console.error("Error creating role:", error);
//       throw error;
//     }
//   }

//   async checkRoleExists(role: RoleList) {
//     try {
//       const existingRole = await prisma.role.findUnique({
//         where: { role },
//       });

//       return !!existingRole;
//     } catch (error) {
//       console.error("Error checking role existence:", error);
//       throw error;
//     }
//   }

//   async assignRoleToUser(userId: number, roleId: number) {
//     try {
//       return await prisma.userRole.create({
//         data: {
//           userId,
//           roleId,
//         },
//       });
//     } catch (error) {
//       console.error("Error assigning role to user:", error);
//       throw error;
//     }
//   }
// }
