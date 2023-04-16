import { Router } from 'express';
const routesAuth = new Router();

import AuthController from '../../controllers/authController.js'
const authRoute = new AuthController()

routesAuth.post('/register', authController.register)
routesAuth.post('/login', authController.login)


module.exports = { routesAuth }