const passport = require("passport"); //passport ve passport jwt indirildi
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("../config");
const Users = require("../db/models/Users");
const UserRoles = require("../db/models/UserRoles");
const RolePrivileges = require("../db/models/RolePrivileges");
const privs = require("../config/role_privileges");
const Response = require("../lib/Response");
const { HTTP_CODES } = require("../config/Enum");
const CustomError = require("./Error");

module.exports = function () {
    let strategy = new Strategy({
        secretOrKey: config.JWT.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //requestten token alıcaz
    }, async (payload, done) => {

        try {
            let user = await Users.findOne({ _id: payload.id });

            //user var mı kontrol
            if (user) {
                let userRoles = await UserRoles.find({ user_id: payload.id });

                let rolePrivileges = await RolePrivileges.find({
                    role_id: { $in: userRoles.map(ur => ur.role_id) }
                })

                let privileges = rolePrivileges.map(rp => privs.privileges.find(x => x.key == rp.permission))

                //done dönüş değeridir gösterilir o yüzden hassas bilgiler tutulmaz
                done(null, {  //done ın ilk parametresi error, ikinci parametresi user       hata olmasın diye null verdik
                    id: user.id,
                    roles: privileges,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME //token süresi (1 günlük olarak ayarladık configde);
                });
            }
            else {
                done(new Error("User not found"), null);
            }
        } catch (err) {
            done(err, null)  //hatayı doldurduk kullanıcıyı boş bıraktık
        }

    })

    passport.use(strategy); //passport strategy i tanır

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {  //token kontrol
            return passport.authenticate("jwt", { session: false }) //session false dedik çünkü session token a gerek yok bearer kullnıyoz
        },
        checkRoles: (...expectedRoles) => {
            return (req, res, next) => {
                if (!req.user || !Array.isArray(req.user.roles)) {
                    return res.status(401).json({
                        code: 401,
                        error: { message: "Need Permission", description: "Need Permission" }
                    });
                }

                let userPrivileges = req.user.roles.map(x => x.key).filter(Boolean);
                let hasPermission = expectedRoles.every(role => userPrivileges.includes(role));

                if (!hasPermission) {
                    return res.status(401).json({
                        code: 401,
                        error: { message: "Need Permission", description: "Need Permission" }
                    });
                }

                next();
            }
        }
    }
}