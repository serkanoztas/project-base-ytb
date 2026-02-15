const mongoose = requiere(mongoose);

const schema = mongoose.Schema({
    role_name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    created_by: { type: mongoose.SchemaTypes.ObjectId, required: true }
},
    {
        versionKey: false, // her işlemde bir versiyon key oluşmasnı engellemek için
        //times kımını mongoose kendi setler
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class Roles extends mongoose.Model {

}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema); //oluşturulacak tablonun adı ve şeması girilir