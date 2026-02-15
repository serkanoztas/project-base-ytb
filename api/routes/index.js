var express = require('express');
var router = express.Router();

const fs = require("fs"); //dosya işlemi yapan kütüphane
let routes = fs.readdirSync(__dirname); //bulunduğumuz (routes) dosyasını kur, _dirname = bulunduğu dizin ismi

for (let route of routes) {
  if (route.includes(".js") && route != "index.js") {
    router.use("/" + route.replace(".js", ""), require("./" + route)); //dinamik routing yapısı aşadaki gibi tek tek vermeye gerek kalmadı

    // app.use('/auditlogs', require('./routes/auditlogs')); //https://localhost/auditlogsı //eski tek tek routing yapısı
  }
}

module.exports = router;
