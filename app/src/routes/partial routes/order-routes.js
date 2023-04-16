import { Router } from 'express'
import  checkToken  from '../../middleware/token.js'
import OrderController from '../../controllers/orderController.js'
const orderController = new OrderController();


const orderRoute = Router ();

orderRoute.post('/', checkToken, orderController.generateOrder);
orderRoute.get('/', checkToken, orderController.getAllOrders);

export default orderRoute