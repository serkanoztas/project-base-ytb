module.exports = {
    "PORT": process.env.PORT || "3000",
    "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
    "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://localhost:27017/project_base_ytb",
    "JWT": {
        "SECRET": "12345",
        "EXPIRE_TIME": !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 24 * 60 * 60 //günü saniyeye çevirdik token yaşam süresi

    }
}

//elle terminalden değişken tanımlalamamak için npm i dotenv --save ile dotenv kurduk artık env dosyasında değişken tanımlanabilir