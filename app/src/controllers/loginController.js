import { loggerError, loggerInfo, loggerWarn } from "../utils/log4js.js";
import AuthDao from '../persistance/models/DAO/authDao.js'
const authDao = new AuthDao();
import passport from 'passport'
import { Strategy } from 'passport-local';
import { isValidPassword} from "../middleware/bcrypt.js"

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser((username, done) => {
    authDao.userExistsByUsername(username, done);
});

const strategyLogin = new Strategy (
    (username, password, done) => {
        authDao.userExistsByEmail({username}, (err, user) => {
            if (err) return done(err);
            if (!user) {
                loggerWarn.warn();('Usuario no encontrado: ' + username);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                loggerError.error('Contraseña invalida');
                return done(null, false);
            }
            return done(null, user);
        });
        })

export default strategyLogin
