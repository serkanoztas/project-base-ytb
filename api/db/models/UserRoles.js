const mongoose = requiere(mongoose);

const schema = mongoose.Schema({
    role_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true }
},
    {    //times kımını mongoose kendi setler
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class UserRoles extends mongoose.Model {

}

schema.loadClass(UserRoles);
module.exports = mongoose.model("user_roles", schema); //oluşturulacak tablonun adı ve şeması girilir