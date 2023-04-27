import cart from "../cartModel.js" 
import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'


export default class CartDao {

    async getAllCarts() {
        try {
            const carts = await cart.find({})
            return carts
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }

    async getCartByUsername(username){
        try {
            const cartByUsername = await cart.find({user: username})
            console.log(cartByUsername)
            return cartByUsername
        } catch (error) {
            loggerError.error(`Error en el carrito: ${error}`)
        }
    }


    async createCart(data) {
        try{
            const newCart = await cart(data).save()
            return newCart
        } catch(error) {
            loggerError.error(`No se pudo crear el nuevo carrito: ${error}`)
        }
    }

    async deleteCart(user) {
        try {
            const cartByUsername = await cart.find({user: user})
            const cartId = cartByUsername._id
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

    async addProductInCart(user, addProd) {
        try {
            
            const cartByUsername = await cart.find({user: user})
            const onlyCart = cartByUsername[0]
            console.log(onlyCart.products)
            const idCart = onlyCart._id
            // if(onlyCart.products != undefined){
            //     const existProd = onlyCart.products.find(product => product._id == addProd._id);
            //     // if(existProd){
            //     //     const products = onlyCart.products.map(product => {
            //     //         product.qty += addProd.qty
            //     //         product.totalPrice = product.qty * product.price
            //     //         return product})
            //     //         onlyCart.products = products
            //     // } else {
            //     //     onlyCart.products.push(addProd)
            //     // }
            // }else{
            //     onlyCart.products.push(addProd)
            // }
            onlyCart.products.push(addProd)
            console.log(onlyCart)
            console.log(idCart)
            const updateCart = await cart.findByIdAndUpdate(idCart, onlyCart, {new:true})
            loggerInfo.info('Producto Agregado')
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