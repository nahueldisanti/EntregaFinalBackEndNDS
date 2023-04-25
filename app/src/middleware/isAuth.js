import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()){
    loggerInfo.info('El usuario esta autenticado')
    return next()}
    loggerInfo.info("No estas autorizado, porfavor inicia sesion")
    res.redirect('/auth/login')
}

export default isAuth