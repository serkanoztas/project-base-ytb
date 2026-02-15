const mongoose = requiere(mongoose);

const schema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String
},
    {    //times kımını mongoose kendi setler
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class Users extends mongoose.Model {

}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema); //oluşturulacak tablonun adı ve şeması girilir