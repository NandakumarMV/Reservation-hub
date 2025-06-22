import { Router } from "express";
import { roleSchema } from "../../validators/role_validator.js";
import { AppError } from "../../utils/error_handler.js";
import { addRoles, listRoles, updateRoles } from "../../services/super_admin/roles.js";

const RoleRouter = new Router()

const createRoleHandler = async (req, res, next) => {
    try {
        const data = roleSchema.safeParse(req.body)

        if (!data.success) {
            const errors = data.error.errors.map(err => err.message).join(",")
            throw new AppError(errors, 400, true);
        }

        return res.status(200).json(await addRoles({ ...req.body }))

    } catch (error) {
        console.log(error);

        next(error)
    }
}

const updateRoleHandler = async (req, res, next) => {
    try {

        const data = roleSchema.safeParse(req.body)

        if (!data.success) {
            const errors = data.error.errors.map(err => err.message).join(",")
            throw new AppError(errors, 400, true);
        }
        return res.status(200).json(await updateRoles({ ...req.body, ...req.params }))
    } catch (error) {
        next(error)
    }
}

const listRoleHandler = async (req, res, next) => {
    try {
        return res.status(200).json(await listRoles({ ...req.query }))
    } catch (error) {
        next(error)
    }
}
RoleRouter.route("/role")
    .post(createRoleHandler)
    .get(listRoleHandler)

RoleRouter.put("/role/:id", updateRoleHandler)

export default RoleRouter