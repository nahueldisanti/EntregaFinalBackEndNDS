import { Router } from 'express';
import CartController from '../../controllers/cartController.js'
const cartController = new CartController()

const cartRoute = Router();

cartRoute.get('/', cartController.getCartByUsername)
cartRoute.get('/create',  cartController.createCart)
cartRoute.delete('/:id/delete',  cartController.deleteCart)
cartRoute.get('/:id/products',  cartController.productsinCart)
cartRoute.get('/:id', cartController.addProductInCart)
cartRoute.delete('/:idcart/products/:idprod', cartController.deleteProductInCart)

export default cartRoute

