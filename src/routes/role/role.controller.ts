// import { Request, Response, NextFunction } from "express";
// import { RoleService } from "./role.service";
// import { RoleList } from "./role.type";

// export class RoleController {
//   private roleService: RoleService;

//   constructor(roleService: RoleService) {
//     this.roleService = roleService;
//   }

//   async getRoles(req: Request, res: Response, next: NextFunction) {
//     try {
//       const roles = await this.roleService.getRoles();

//       if (!roles) {
//         console.log("No roles found");
//         res.status(404).json({ error: "No roles found" });
//         return;
//       }

//       res.status(200).json(roles);
//       return;
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//   }

//   async createRole(req: Request, res: Response) {
//     try {
//       const { role } = req.body as { role: RoleList };

//       const newRole = await this.roleService.createRole({ role });

//       res.status(201).json(newRole);
//       return;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

//       res.status(500).json({ error: errorMessage });
//       return;
//     }
//   }

//   async assignRoleToUser(req: Request, res: Response) {
//     try {
//       const userRole = req.user?.roles;
//       let userId = 0;
//       let roleId = 0;

//       if (userRole?.includes("Admin")) {
//         userId = req.body.userId;
//         roleId = req.body.roleId;
//       } else {
//         userId = Number(req.user?.id);
//         roleId = req.body.roleId;
//       }

//       if (!userId || !roleId) {
//         res.status(400).json({ error: "User ID and Role ID are required" });
//         return;
//       }

//       const result = await this.roleService.assignRoleToUser(userId, roleId);

//         res.status(200).json(result);
//         return;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

//       res.status(500).json({ error: errorMessage });
//       return;
//     }
//   }
// }
