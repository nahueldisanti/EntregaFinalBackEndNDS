import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'
import moment from 'moment'
import CartDao from "../persistance/models/DAO/cartDao"
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

    async getCartById(cartId){
        try {
            const cartById = await cartDao.getCartById(cartId);
            return cartById
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }


    async createCart(data, tokenHeader) {
        try{
            const user = await authDao.getUserByToken(tokenHeader) 
            cart.user = user.username
            cart.address = user.address
            cart.timestamp = moment().format('L LTS')
            cart.products = []
            const newCart = await cartDao.createCart(cart)
            return newCart
        } catch(error) {
            loggerError.error(`No se pudo crear el nuevo carrito: ${error}`)
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await cartDao.deleteCart(cartId);
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

    async addProductInCart(cartId, prodId, qty) {
        try {
            const productById = await prodDao.getProdctById(prodId);
            if (productById.idProduct === null) {
                logger.warn('Producto no encontrado')
            }
            const addProd = {
                productId: prodId, 
                name: productById.name,
                description: productById.description,
                category: productById.category,
                priceUnit: productById.price,
                qty: qty,
                totalPrice: productById.price * qty
            }
            const cartUpdated = await cartDao.addProductInCart(cartId, addProd)
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