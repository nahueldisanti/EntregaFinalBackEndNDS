import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
import moment from 'moment'
import OrderDao from '../persistance/models/DAO/orderDao.js'
const orderDao = new OrderDao();
import AuthDao from '../persistance/models/DAO/authDao.js'
const authDao = new AuthDao();
import CartDao from '../persistance/models/DAO/cartDao.js'
const cartDao = new CartDao();
import sendMail from '../utils/nodemailers.js'


export default class OrderServices {
    async newOrder(cartId, email) {
        try{
            const cartById = await cartDao.getCartById(cartId);
            const orders = await orderDao.getAllOrders();y
            let numOrder = 0
            if (orders.length === 0){
                numOrder = 1
            } else {
                const lastOrder = orders[orders.length -1]
                numOrder = lastOrder.numberOrder + 1
            }
            if(cartById){
                const newOrder = {
                    numberOrder: numOrder, 
                    stateOrder: 'Generada',
                    timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    user: cartById.user,
                    address: cartById.address,
                    products: cartById.products 
                }
                const createdOrder = await orderDao.generateOrder(newOrder);
                sendMail(newOrder);
                return createdOrder
            } else {
                loggerWarn.warn('El carrito no pudo checkearse')
            }
        }catch (error) { 
            loggerError.error(error)
        }
    }

    async getAllOrders() {
        try{
            const orders = await orderDao.getAllOrders()
            return orders
        } catch (error) {
            loggerError.error(error)
        }
    }

}