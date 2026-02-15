const mongoose = requiere(mongoose);

const schema = mongoose.Schema({
    role_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    permission: { type: String, requiered: true },
    created_by: { type: mongoose.SchemaTypes.ObjectId, required: true }
},
    {    //times kımını mongoose kendi setler
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class RolePrivileges extends mongoose.Model {

}

schema.loadClass(RolePrivileges);
module.exports = mongoose.model("role_privileges", schema); //oluşturulacak tablonun adı ve şeması girilir