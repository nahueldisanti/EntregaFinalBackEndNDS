import { cart } from "../cartModel.js" 
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'


class CartDao {
    constructor() {
        this.cart = []
    }
    async getAllCarts() {
        try {
            const carts = await cartModel.find({})
            return carts
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }

    async createCart(data) {
        try{
            const newCart = await cart(data).save()
            return cart
        } catch(error) {
            loggerError.error(`No se pudo crear el nuevo carrito: ${error}`)
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await cart.findByIdAndDelete(cartId);
            return deletedCart
        }catch(error){
            loggerError.error(`No se pudo elimiar el nuevo carrito: ${error}`)
        }
    }

    async getProductsInCart(cartId) {
        try{
            const cartById = await cart.findById(cartId)
            const products = [...cartById.productos];        
            return products
        } catch (error) {
            loggerError.error(`No pudimos encontrar los productos del carrito con ID: ${cartId}: ${error}`)
        }
    }

    async addProductInCart(cartId, addProd) {
        try {
            const cartById = await cart.findById(cartId)
            if (cartById === null) {
                loggerWarn.warn(`No encontramos el carrito con id ${cartId}`);
            }
            
        }
    }
}