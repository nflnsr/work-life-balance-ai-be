// import { Router, Request, Response, NextFunction } from "express";
// import { authenticate } from "../../middleware/authenticate";
// import { RoleRepository } from "./role.repository";
// import { RoleService } from "./role.service";
// import { RoleController } from "./role.controller";

// const router = Router();

// const roleRepository = new RoleRepository();
// const roleService = new RoleService(roleRepository);
// const roleController = new RoleController(roleService);

// router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
//   return roleController.getRoles(req, res, next);
// });

// router.post("/", authenticate, (req: Request, res: Response) => {
//   return roleController.createRole(req, res);
// });

// router.post("/assign", authenticate, (req: Request, res: Response) => {
//   return roleController.assignRoleToUser(req, res);
// });

// export default router;
