import { loggerError, loggerInfo, loggerWarn } from "../utils/log4js.js";
import AuthDao from '../persistance/models/DAO/authDao.js'
const authDao = new AuthDao();
import { Strategy as LocalStrategy } from 'passport-local';
import { createHash } from "../middleware/bcrypt.js"
import sendMailRegister from "../utils/nodemailerNewRegist.js";
import passport from 'passport'

const strategySignUp = new LocalStrategy({
    passReqToCallback: true
},
async (req, username, password, done) => {
    try {
        const foundUser = await authDao.userExistsByUsername(username);
        if (foundUser) {
            console.log('Usuario Existente');
        } else {
            const newUser = {
                name: req.body.name,
                username: username,
                email: req.body.email, 
                password: createHash(password),
                address: req.body.address, 
                edad: req.body.edad, 
                phone: req.body.phone, 
            };
            await authDao.register(newUser);
            return done(null, newUser);
            sendMailRegister(newUser);
        }
    } catch (err) {
        console.log('Error in SignUp: ' + err);
        return done(err);
    }
});

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser((id, done) => {
    authDao.userExistsByUsername(username, done);
});

passport.use('register', strategySignUp);

export default strategySignUp