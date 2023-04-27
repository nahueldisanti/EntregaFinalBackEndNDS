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

}
