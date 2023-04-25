import { loggerError, loggerInfo, loggerWarn } from "../utils/log4js.js";
import AuthDao from '../persistance/models/DAO/authDao.js'
const authDao = new AuthDao();
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { isValidPassword} from "../middleware/bcrypt.js"


const strategyLogin = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await authDao.userExistsByUsername(username);
            if (!user) {
                loggerWarn.warn('Usuario no encontrado: ' + username);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                loggerError.error('Contraseña invalida');
                return done(null, false);
            }
            loggerInfo.info('Usuario encontrado')
            return done(null, user);
        } catch (err) {
            loggerError.error('Error en Login: ' + err);
            return done(err);
        }
    }
);

passport.serializeUser(function (user, done){
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const userSelected = await authDao.userExistsByUsername(username)
    done(null, userSelected)
})


export default strategyLogin
