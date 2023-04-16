import CartServices from "../Services/cartServices.js"
const cartServices = new CartServices()

export default class cartController {

    async getAllCarts(req, res) {
        try {
            const allCarts = await cartServices.getAllCarts()
            res.status(200).json(allCarts)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getCartById(req, res){
        try {
            const cartById = await cartServices.getCartById(req.params.id);
            res.status(200).json(cartById)
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }

    async createCart(req, res) {
        try {
            const tokenHeader = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
            const newCart = await cartServices.createCart(req.body, tokenHeader) 
            res.status(200).json(newCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteCart(req, res) {
        try {
            const deleteCart = await cartServices.deleteCart(req.params.id)
            res.status(200).json(deleteCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async productsinCart(req, res) {
        try {
            const productsInCartById = await cartServices.getProductsInCart(req.params.id)
            res.status(200).json(productsInCartById)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async addProductInCart(req, res) {
        try {
            const qty = parseInt(req.body.qty)
            const cartId = req.params.id
            const addProduct = await cartServices.addProductInCart(cartId, req.body.prodId, qty)
            res.status(200).json(addProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteProductInCart(req, res) {
        try {
            const deleteProduct = await cartServices.deleteProductInCart(req.params.cartId, req.params.productId)
            res.status(200).json(deleteProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}