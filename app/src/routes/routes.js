import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const routes = Router()

import failRoute from "./partial routes/fail-route.js"
import productsRoute from './partial routes/products-route.js'
import infoRoute from "./partial routes/info-route.js"
import loginRoute from "./partial routes/login-route.js"
import logoutRoute from './partial routes/logout-route.js'
import signupRoute from "./partial routes/signup-route.js"
import messagesRoute from "./partial routes/messages-route.js"
import cartRoute from "./partial routes/cart-route.js"



routes.use('/', productsRoute);
routes.use('/login', loginRoute);
routes.use('/signup', signupRoute);
routes.use('/logout', logoutRoute);
routes.use('/info',infoRoute);
routes.use('/error-login',failRoute);
routes.use('/chat', messagesRoute)
routes.use('/cart', cartRoute)


routes.get('/*', (req, res, next) => {
    try {
    loggerWarn.warn("Ruta inexistente");
    res.redirect('/login')
    next();
    } catch (error) {
        loggerError.error('Error en la ruta: ' + error.message)
        res.send('Error')
    }
})

module.exports = routes;

