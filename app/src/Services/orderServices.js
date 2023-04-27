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
    async newOrder(currentSession) {
        try{
            const cartByUsername = await cartDao.getCartByUsername(currentSession);
            const cart = cartByUsername[0]
            console.log(`Cart By Username:${cartByUsername}`)
            const newOrder = {
                orderState: 'Generada',
                timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: cart.user,
                address: cart.address,
                products: cart.products 
            }
            console.log(newOrder)
            const createdOrder = await orderDao.newOrder(newOrder);
            sendMail(newOrder);
            cartDao.deleteCart();
            return createdOrder
            
        }catch (error) { 
            loggerError.error(error)
        }
    }
}
