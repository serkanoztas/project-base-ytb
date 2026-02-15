module.exports = {
    "PORT": process.env.PORT || "3000",
    "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
    "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://localhost:27017/project_base_ytb"
}

//elle terminalden değişken tanımlalamamk için npm i dotenv --save ile dotenv kurduk artık env dosyasında değişken tanımlanabilir