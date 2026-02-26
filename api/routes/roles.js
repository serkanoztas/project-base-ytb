var express = require("express");
var router = express.Router();

const Roles = require("../db/models/Roles");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");
const role_privileges = require("../config/role_privileges");
const RolePrivileges = require("../db/models/RolePrivileges");


router.get("/", async (req, res) => {

    try {
        let roles = await Roles.find({});
        res.json(Response.successResponse(roles));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});


router.post("/add", async (req, res) => {
    try {
        const { role_name, permissions } = req.body;

        if (!role_name) {
            throw new CustomError(
                Enum.HTTP_CODES.BAD_REQUEST,
                "Validation Error",
                "role_name field must be filled"
            );
        }

        if (!Array.isArray(permissions) || permissions.length === 0) {
            throw new CustomError(
                Enum.HTTP_CODES.BAD_REQUEST,
                "Validation Error",
                "permissions must be a non-empty array"
            );
        }

        const role = new Roles({
            role_name,
            is_active: true,
            created_by: req.user?.id || null
        });

        await role.save();

        // 🔥 BURASI KRİTİK
        for (let i = 0; i < permissions.length; i++) {
            await RolePrivileges.create({
                role_id: role._id,
                permission: permissions[i],
                created_by: req.user?.id || null
            });
        }

        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        console.error("ADD ROLE ERROR:", err);
        const errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});



router.post("/update", async (req, res) => {
    let body = req.body;
    try {
        if (!body._id) {
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id field must be filled")
        }

        let updates = {};
        if (body.role_name) updates.role_name = body.role_name;
        if (typeof body.is_active === "boolean") updates.is_active = body.is_active;
        //-------------------------------------------------------------------------------------------------------

        if (body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0) {

            //body.permissions => ["cetegory_view", "user_add"]
            //permissions => [{"role_id": "abc", "premission": "user_add", "_id": "bcd"}]

            let selectedPermissions = await RolePrivileges.find({
                role_id: body._id
            });

            let removedPermissions = selectedPermissions.filter(
                x => !body.permissions.includes(x.permission)
            );

            const existingPermissions = selectedPermissions.map(p => p.permission);

            let newPermissions = body.permissions.filter(
                x => !existingPermissions.includes(x)
            );


            if (removedPermissions.length > 0) {
                await RolePrivileges.deleteMany({ _id: { $in: removedPermissions.map((x) => x._id) } });
            }

            if (newPermissions.length > 0) {
                for (let i = 0; i < newPermissions.length; i++) {
                    let priv = new RolePrivileges({
                        role_id: body._id,
                        permission: newPermissions[i],
                        created_by: req.user?.id
                    })
                    await priv.save();
                }
            }


        }
        //-------------------------------------------------------------------------------------------------------
        await Roles.updateOne({ _id: body._id }, updates);
        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});



router.post("/delete", async (req, res) => {
    let body = req.body;
    try {
        if (!body._id) {
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id field must be filled")
        }

        await Roles.deleteOne({ _id: body._id });
        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
}),

    router.get("/role_privileges", async (req, res) => {
        res.json(role_privileges);
    })


module.exports = router;
