const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("../config");
const Users = require("../db/models/Users");
const UserRoles = require("../db/models/UserRoles");
const RolePrivileges = require("../db/models/RolePrivileges");

module.exports = function () {
    let strategy = new Strategy({
        secretOrKey: config.JWT.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //requestten token alıcaz
    }, async (payload, done) => {

        try {
            let user = await Users.findOne({ _id: payload.id });

            //user var mı kontrol
            if (user) {
                let userRoles = await UserRoles.findOne({ role_id: payload.id });

                let rolePrivileges = await RolePrivileges.findOne({
                    role_id: { $in: userRoles.map(ur => ur.role_id) }
                })

                //done dönüş değeridir gsöterilir o yüzden hassas bilgiler tutulmaz
                done(null, {  //done ın ilk parametresi error, ikinci parametresi user       hata olmasın diye null verdik
                    id: user.id,
                    roles: rolePrivileges,
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
        authenticate: function () {
            return passport.authenticate("jwt", { session: false }) //session false dedik çünkü session token a gerek yok bearer kullnıyoz
        }
    }
}