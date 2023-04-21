import { loggerError, loggerInfo, loggerWarn } from "../utils/log4js.js";
import AuthDao from '../persistance/models/DAO/authDao.js'
const authDao = new AuthDao();
import bycrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local';
import { createHash } from "../middleware/bcrypt.js"
import sendMailRegister from "../utils/nodemailerNewRegist.js";

const strategySignUp = new Strategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        authDao.userExistsByUsername({ 'username': username }, function (err, user) {
        if (err) {
            loggerError.error('Error in SingUp: ' + err);
            return done(err);
        }   
        if (user) {
            loggerWarn.warn('El usuario ya existe');
            return done(null, false)
        }

        const newUser = {
            name: req.body.name,
            username: req.body.username,
            correo: req.body.correo, 
            password: createHash(password),
            address: req.body.address, 
            edad: req.body.edad, 
            phone: req.body.phone, 
        }
        user.register(newUser, (err, userWithId) => {
            if (err) {
                loggerError.error('Error al guardar el usuario: ' + err);
                return done(err);
            }
            console.log(user)
            loggerInfo.info('El usuario se registró correctamente');
            return done(null, userWithId);
        });

        sendMailRegister(newUser);
    });
})

export default strategySignUp