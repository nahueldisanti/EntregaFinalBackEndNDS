import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

import {getProducts, getMessages} from "../business/productsController.js";

const orderRoute = Router ();

orderRoute.post('/', isAuth, );
orderRoute.get('/', isAuth, orderController.getAllOrders);

export default orderRoute