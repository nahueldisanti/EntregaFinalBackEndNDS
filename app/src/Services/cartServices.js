import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
import moment from 'moment'
import CartDao from "../persistance/models/DAO/cartDao.js"
const cartDao = new CartDao()
import ProductsDao from "../persistance/models/DAO/productsDao.js"
const prodDao = new ProductsDao();
import AuthDao from "../persistance/models/DAO/authDao.js"
const authDao = new AuthDao();

export default class CartServices {

    async getAllCarts() {
        try {
            const carts = await cartDao.getAllCarts()
            return carts
        } catch (error) {
            loggerError.error(error)
        }
    }

    async getCartByUsername(username){
        try {
            const cartByUsername = await cartDao.getCartByUsername(username);
            console.log(cartByUsername)
            return cartByUsername
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }


    async createCart(userSession) {
        try{
            const user = await authDao.userExistsByUsername(userSession) 
            const cart = {
                user: user.username,
                address: user.address,
                timestamp: moment().format('L LTS'),
                products: []}
            
                const newCart = await cartDao.createCart(cart)
            return newCart
        } catch(error) {
            loggerError.error(`No se pudo crear el nuevo carrito: ${error}`)
        }
    }

    async deleteCart(user) {
        try {
            const deletedCart = await cartDao.deleteCart(user);
            return deletedCart
        }catch(error){
            loggerError.error(`No se pudo elimiar el nuevo carrito: ${error}`)
        }
    }

    async getProductsInCart(cartId) {
        try{
            const cartById = await cartDao.getProductsInCart(cartId);
            const products = cartById.products       
            return products
        } catch (error) {
            loggerError.error(`No pudimos encontrar los productos del carrito con ID: ${cartId}: ${error}`)
        }
    }

    async addProductInCart(user, productId, qty) {
        try {
            const productById = await prodDao.getProdctById(productId);
            if (productById.productId === null) {
                logger.warn('Producto no encontrado')
            }
            const addProd = {
                productId: productId, 
                name: productById.name,
                description: productById.description,
                category: productById.category,
                priceUnit: productById.price,
                qty: qty,
                totalPrice: productById.price * qty
            }
            const cartUpdated = await cartDao.addProductInCart(user, addProd)
            return cartUpdated

        }catch(error){
            loggerError.error(error)
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const cartUpdated = await cartDao.deleteProduct(cartId, productId)
            return cartUpdated
        }catch(error){
            loggerError.error(error)
        }
    }
}