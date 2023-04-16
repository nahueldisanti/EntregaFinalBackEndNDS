import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'
import OrderServices from '../Services/orderServices.js'
const orderServices = new OrderServices();

export default class OrderController {

    async generateOrder(req, res){
        try{
            const order = await orderServices.generateOrder(req.body.cartId)
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getAllOrders(req, res){
        try{
            const orders = await orderServices.getAllOrders()
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

}