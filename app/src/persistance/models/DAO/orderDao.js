import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'
import order from "../orderModel.js"

export default class OrderDao {

    async newOrder(data) {
        try {
            const newOrder = await order(data).save()
            return newOrder

        } catch(error) {
            loggerError.error(error)
        }
    }

    async getOrderById(id) {
        try {
            const orderById = await order.findById(id);
            return orderById

        } catch(error) {
            loggerError.error(error)
        }
    }

}