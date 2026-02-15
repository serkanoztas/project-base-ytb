const mongoose = requiere(mongoose);

const schema = mongoose.Schema({
    is_active: { type: Boolean, default: true },
    created_by: { type: mongoose.SchemaTypes.ObjectId, required: true }
},
    {    //times kımını mongoose kendi setler
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class Categoris extends mongoose.Model {

}

schema.loadClass(Categoris);
module.exports = mongoose.model("categoris", schema); //oluşturulacak tablonun adı ve şeması girilir