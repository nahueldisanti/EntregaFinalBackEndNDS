import AuthDao from '../persistance/models/DAO/authDao.js'
const authDao = new AuthDao();
import bcrypt from 'bcrypt'
import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
import sendMailRegister from '../utils/nodemailerNewRegist.js';

export default class AuthServices {

    async register(info) {
        try {
            const userExist = await authDao.userExistsByEmail(info.email)
            if (!userExist) {
                let encryptedPassword = await bcrypt.hash(info.password, 10)
                const newUser = {
                    username: info.username,
                    name: info.name,
                    phone: info.phone,
                    address: info.address,
                    email: info.email,
                    password: encryptedPassword
                }
                const userAdded = await authDao.register(newUser)
                sendMailRegister(newUser)
                return userAdded
            } else {
                loggerWarn.warn("El usuario ya existe")
            }
        } catch (error) {
            loggerError.error("Error en register-Services: " + error)
        }
    }

    async login(info) {
        try {
            const { email, password } = info
            const user = await authDao.login(email, password)
            return user
        } catch (error) {
            loggerError.error("Error en login-Services: " + error)
        }
    }
}