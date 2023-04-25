import { Router } from 'express';
const routesAuth = new Router();
import passport from 'passport'
import { loggerInfo, loggerError, loggerWarn } from '../../utils/log4js.js'
import dotenv from 'dotenv'
dotenv.config();

//REGISTER
routesAuth.get('/register', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /register')
        if (req.isAuthenticated()) return res.redirect('/products')
        res.render('register')
    } catch(error) {
        loggerError.error('Error en /register: ' + error)
        res.send('Error')
    }
})

routesAuth.get('/error-signup', (req, res) => {
    try{
        loggerError.error('Error en el registro')
        res.render('error-signup')
    }catch(error) {
        loggerError.error(error)
    }
})

routesAuth.post('/register', passport.authenticate('register', {failureRedirect: '/auth/error-signup'}), (req, res) => {
    loggerInfo.info('Acceso permitido')
    res.redirect('/products')
})

//LOG IN

routesAuth.post('/login', passport.authenticate('login', { failureRedirect: '/auth/error-login', successRedirect: '/products' }))

routesAuth.get('/login', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /login')
        if (req.isAuthenticated()) {
            loggerInfo.info("Usuario Autenticado")
            return res.redirect('/products')}
        loggerInfo.info('Usuario no autenticado')
        res.render('login.ejs')
    } catch(error) {
        loggerError.error('Error en /login: ' + error)
        res.send('Error')
    }
})

routesAuth.get('/error-login', (req, res) => {
    try{
        loggerError.error('Error en el login')
        res.render('error-login')
    }catch(error) {
        loggerError.error(error)
    }
})


export default routesAuth