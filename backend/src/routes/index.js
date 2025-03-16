import { Router } from "express";
import SuperUserRouter from "./super_users.js/super_users.js";

const Routes = new Router()

Routes.use(SuperUserRouter)

export default Routes