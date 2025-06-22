import { Router } from "express";
import SuperUserRouter from "./super_users.js";
import RoleRouter from "./roles.js";

const Routes = new Router()

Routes.use(SuperUserRouter)
Routes.use(RoleRouter)
export default Routes