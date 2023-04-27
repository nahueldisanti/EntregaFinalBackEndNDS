import CartServices from "../Services/cartServices.js"
const cartServices = new CartServices()


export default class cartController {

    async getAllCarts(req, res) {
        try {
            const userSession = req.session.passport.user
            const cart = await cartServices.getAllCarts()
            res.status(200).render('cart', {
            userSession, 
            cart})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getCartByUsername(req, res){
        try {
            const currentSession = req.session.passport.user
            const cartByUsername = await cartServices.getCartByUsername(currentSession);
            const cartProducts = cartByUsername[0].products
            res.status(200).render('cart', {
            currentSession,
            cartProducts})
        } catch (error) {
            res.send(`Error en el carrito: ${error}`)
        }
    }

    async createCart(req, res) {
        try {
            const userSession = req.session.passport.user
            const newCart = await cartServices.createCart(userSession)
            console.log('Carrito Creado')
            res.status(200).redirect('/products')
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteCart(req, res) {
        try {
            const user = req.session.passport.user
            const deleteCart = await cartServices.deleteCart(user)
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
            const user = req.session.passport.user
            const qty = parseInt(req.body.qty)
            const productId = req.params.id
            const addProduct = await cartServices.addProductInCart(user, productId, qty)
            res.status(200).redirect('/products')
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