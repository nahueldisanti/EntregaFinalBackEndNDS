
import { Router } from 'express'
import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'

const routes = Router()

//import failRoute from "./partial routes/fail-route.js"
import productsRoute from './partial routes/products-route.js'
import messagesRoute from "./partial routes/messages-route.js"
import cartRoute from "./partial routes/cart-route.js"
import orderRoute from "./partial routes/order-routes.js"
import routesAuth from "./partial routes/auth-route.js"


routes.use('/', productsRoute);
routes.use('/auth', routesAuth);
//routes.use('/error-login',failRoute);
routes.use('/chat', messagesRoute)
routes.use('/cart', cartRoute)
routes.use('/order', orderRoute)


routes.get('/*', (req, res, next) => {
    try {
    loggerWarn.warn("Ruta inexistente");
    res.redirect('/auth')
    next();
    } catch (error) {
        loggerError.error('Error en la ruta: ' + error.message)
        res.send('Error')
    }
})

export default routes

