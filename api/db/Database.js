const mongoose = require("mongoose");
const config = require("../config");

let instance = null;
class Database {
    constructor() {
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }
    async connect(options) {

        try {
            console.log("DB Connecting...");

            let db = await mongoose.connect(config.CONNECTION_STRING);

            this.mongoConnection = db;

            console.log("DB Connected");
        } catch (error) {
            console.error(error);
            process.exit(1); //db bağlanamazsa programı kapatır
        }
    }

}

module.exports = Database;