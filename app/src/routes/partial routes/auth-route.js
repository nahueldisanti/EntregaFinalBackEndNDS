import { Router } from 'express';
const routesAuth = new Router();

import AuthController from '../../controllers/authController.js'
const authController = new AuthController()

routesAuth.post('/register', authController.register)
routesAuth.post('/login', authController.login)


export default routesAuth