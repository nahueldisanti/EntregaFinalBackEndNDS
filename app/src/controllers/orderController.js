import OrderServices from '../Services/orderServices.js'
const orderServices = new OrderServices();

export default class OrderController {

    async generateOrder(req, res){
        try{
            const currentSession = req.session.passport.user
            const order = await orderServices.newOrder(currentSession)
            const orderProducts = order.products
            res.status(200).render('order',{
                orderProducts,
                currentSession
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}