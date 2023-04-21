import { Router } from 'express';
const routesAuth = new Router();
import passport from 'passport'
import { loggerInfo, loggerError, loggerWarn } from '../../utils/log4js.js'

//REGISTER
routesAuth.get('/register', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /signup')
        if (req.isAuthenticated()) return res.redirect('/auth/products')
        res.render('register')
    } catch(error) {
        loggerError.error('Error en /signup: ' + error)
        res.send('Error')
    }
})

routesAuth.post('/register', passport.authenticate('signup', {failureRedirect: '/error-signup'}), (req, res) => res.redirect('/login'))

//LOG IN
routesAuth.post('/login', passport.authenticate('login', {failureRedirect: '/error-login'}), (req, res) => res.redirect('/'))
routesAuth.get('/login', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /login')
        if (req.isAuthenticated()) return res.redirect('/auth/products')
        res.render('login')
    } catch(error) {
        loggerError.error('Error en /login: ' + error)
        res.send('Error')
    }
})


export default routesAuth