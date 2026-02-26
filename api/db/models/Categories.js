const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    created_by: { type: mongoose.SchemaTypes.ObjectId }
},
    {    //times kımını mongoose kendi setler
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class Categorises extends mongoose.Model {

}

schema.loadClass(Categorises);
module.exports = mongoose.model("categories", schema); //oluşturulacak tablonun adı ve şeması girilir