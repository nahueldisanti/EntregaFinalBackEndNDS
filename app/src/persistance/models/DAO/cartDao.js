import cart from "../cartModel.js" 
import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'


export default class CartDao {

    async getAllCarts() {
        try {
            const carts = await cartModel.find({})
            return carts
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }

    async getCartById(cartId){
        try {
            const cartById = await cartModel.findById(cartId)
            return cartById
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
            const existProd = cartById.products.find(product => product._id == addProd._id);
            if(existProd){
                const products = cartById.products.map(product => {
                    product.qty += addProd.qty
                    product.totalPrice = product.qty * product.price
                    return product
                })

                cartById.products = products
            } else {
                cartById.products.push(addProd)
            }
            const updateCart = await cartModel.findByIdAndUpdate(idCart, cartById, {new:true})
            return updateCart
        }catch(error){
            loggerError.error(error)
        }
    }

    async deleteProduct(idCart, productId) {
        try {
            const cartById = await cart.findById(cartId)
            const productDelete = cartById.products.findeIndex(product => product._id === productId);
            if(productDelete != null){
                cartById.cart.splice(productDelete, 1)
                const updateCart = await cartModel.findByIdAndUpdate(idCart, cartById, {new:true})
                return updateCart
            }
            return cartById
        }catch(error){
            loggerError.error(error)
        }
    }
}