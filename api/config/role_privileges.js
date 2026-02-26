module.exports = {
    privGroups: [
        {
            id: "USERS",
            name: "User Permission"
        },
        {
            id: "ROLES",
            name: "Roles Permission"
        },

        {
            id: "CATERGORIES",
            name: "Category Permission"
        },

        {
            id: "AUDITLOGS",
            name: "AuditLogs Permission"
        },
    ],

    privileges: [
        {
            key: "user_view",
            name: "User View",
            groups: "USERS",
            description: "User view"
        },
        {
            key: "user_add",
            name: "User Add",
            groups: "USERS",
            description: "User add"
        },
        {
            key: "user_update",
            name: "User Update",
            groups: "USERS",
            description: "User update"
        },
        {
            key: "user_delete",
            name: "User Delete",
            groups: "USERS",
            description: "User delete"
        },

        {
            key: "role_view",
            name: "Role View",
            groups: "ROLES",
            description: "Role view"
        },
        {
            key: "role_add",
            name: "Role Add",
            groups: "ROLES",
            description: "Role add"
        },
        {
            key: "role_update",
            name: "Role Update",
            groups: "ROLES",
            description: "Role update"
        },
        {
            key: "role_delete",
            name: "Role Delete",
            groups: "ROLES",
            description: "Role delete"
        },


        {
            key: "categories_view",
            name: "Categories View",
            groups: "CATEGORIES",
            description: "Categories view"
        },
        {
            key: "categories_add",
            name: "Categories Add",
            groups: "CATEGORIES",
            description: "Categories add"
        },
        {
            key: "categories_update",
            name: "Categories Update",
            groups: "CATEGORIES",
            description: "Categories"
        },
        {
            key: "categories_delete",
            name: "Categories Delete",
            groups: "CATEGORIES",
            description: "Categories delete"
        },

        {
            key: "auditlogs_view",
            name: "AuditLogs View",
            groups: "AUDITLOGS",
            description: "Auditlogs view"
        }
    ]
}