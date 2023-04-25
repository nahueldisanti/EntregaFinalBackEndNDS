import isAuth from "../middleware/isAuth.js"
import { Router } from 'express'
import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
import passport from 'passport'
import session from "express-session"
import dotenv from 'dotenv'
dotenv.config();


const routes = Router()

//import failRoute from "./partial routes/fail-route.js"
import productsRoute from './partial routes/products-route.js'
import messagesRoute from "./partial routes/messages-route.js"
import cartRoute from "./partial routes/cart-route.js"
import orderRoute from "./partial routes/order-routes.js"
import routesAuth from "./partial routes/auth-route.js"


routes.use('/products',isAuth, productsRoute);
routes.use('/auth', routesAuth);
routes.use('/chat',isAuth, messagesRoute)
routes.use('/cart',isAuth, cartRoute)
routes.use('/order',isAuth, orderRoute)

routes.get('/', (req, res) => {
    loggerInfo.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente, REDIRIGIENDO A LOGIN`);
    res.redirect('/products')
})

routes.get('*', (req, res, next) => {
    try {
    loggerWarn.warn(`Route: ${req.path} 404 Not Found Method: ${req.method} `);
    res.render('errorPage')
    } catch (error) {
        loggerError.error('Error en la ruta: ' + error.message)
        res.send('Error')
    }
})

export default routes

