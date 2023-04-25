import user from '../userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'
import 'dotenv/config'

export default class AuthDao {

    async getLogin() {
        try{ 
            const allLogins = await user.find({});
            return allLogins
        }catch(error) {
            loggerError.error(error)
        }
    }

    async userExistsByUsername(username) {
        try {
            const userFound = await user.findOne({ username: username })
            return userFound
        } catch (error) {
            loggerError.error(error)
        }
    }

    async register(data) {
        try {
            const userCreated = await user.create(data)
            return userCreated
        } catch (error) {
            loggerError.error(error)
        }
    }

    // async login(email, password) {
    //     try {
    //         const user = await user.findOne({ email })
    //         const isPasswordMatch = bcrypt.compare(password, user.password)
    //         if (!isPasswordMatch || !user) {
    //             logger.warn('Usuario o contraseña incorrecta')
    //         }
    //         const payload = { email: user.email}
    //         const secret = process.env.JWT_SECRET;
    //         const token = jwt.sign(payload, secret, { expiresIn: process.env.JWT_TIME })
    //         return { ...payload, token }
    //     } catch (error) {
    //         loggerError.error(error)
    //     }
    // }

    // async getUserByToken(tokenH) {
    //     let token = tokenH
    //     try{
    //         if (!tokenH) {
    //             return null
    //         }
    //         try{
    //             const tempToken = tokenH.split(' ')
    //             if (tempToken.length == 2) {
    //                 token = tempToken[1]
    //             }
    //             const secret = process.env.JWT_SECRET
    //             const decoded = jwt.verify(token, secret)
    //             const user = await UserModel.findOne({ email: decoded.email })
    //             return user
    //         } catch (error) {
    //             return null
    //         }
    //     }
    //     catch(error){
    //         loggerError.error(error)
    //     }
    // }
}
