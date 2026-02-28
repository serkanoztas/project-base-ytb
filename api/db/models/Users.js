const mongoose = require("mongoose");
const Enum = require("../../config/Enum");
const is = require("is_js");
const CustomError = require("../../lib/Error");
const bcrypt = require("bcrypt-nodejs");

const schema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String
},
    {    //times kımını mongoose kendi setler
        versionKey: false,
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

class Users extends mongoose.Model {

    //password kontrol
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    //email ve password kontrol class ile çağırmak için static verdik
    static validateFieldsBeforeAuth(email, password) {
        if (typeof password !== "string" || password.length < Enum.PASSWORD_LENGTH || is.not.email(email))
            throw new CustomError(Enum.HTTP_CODES.UNAUTHORIZED, "Validation Error", "email or password is wrong");

        return null;
    }
}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema); //oluşturulacak tablonun adı ve şeması girilir