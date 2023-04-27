import { Router } from 'express'
import OrderController from '../../controllers/orderController.js'
const orderController = new OrderController();


const orderRoute = Router ();

orderRoute.get('/',  orderController.generateOrder);

export default orderRoute