import { Router } from 'express'
import OrderController from '../../controllers/orderController.js'
const orderController = new OrderController();


const orderRoute = Router ();

orderRoute.post('/',  orderController.generateOrder);
orderRoute.get('/orders', orderController.getAllOrders);

export default orderRoute