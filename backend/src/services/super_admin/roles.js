import RolesModel from "../../models/users/roles.js";
import { AppError } from "../../utils/error_handler.js";
import { generateHandle } from "../../utils/generate-handles.js";
import { paginated_response } from "../../utils/paginated_response.js";

export const addRoles = async ({ name }) => {
    try {
        const handle = generateHandle(name)
        const exists = await RolesModel.findOne({ handle })
        if (exists) throw new AppError("Role already Exists", 400)
        await RolesModel.create({
            name,
            handle
        })
        return { message: "Role Created Successfully" }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const updateRoles = async ({ name, id, status }) => {
    try {

        const handle = generateHandle(name)
        const exists = await RolesModel.findOne({ handle, _id: { $ne: id } })
        if (exists) throw new AppError("Role already Exists")
        const updateRole = await RolesModel.findOneAndUpdate({ _id: id }, {
            name,
            handle,
            status
        })

        if (!updateRole) throw new AppError("Invalid Role", 400);
        return { message: "Role Updated Successfully" }
    } catch (error) {
        throw error
    }
}
export const listRoles = async ({ page = 1, page_size }) => {
    try {
        const size = page_size || process.env.PAGE_SIZE || 10
        const skip = (parseInt(page) - 1) * parseInt(size);

        const [roles, total] = await Promise.all([
            RolesModel.find({})
                .skip(skip)
                .limit(size)
                .sort({ createdAt: -1 }),
            RolesModel.countDocuments({})
        ]);

        return paginated_response(page, size, total, roles)
    } catch (error) {
        throw error
    }
};