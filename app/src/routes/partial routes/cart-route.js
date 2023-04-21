import { Router } from 'express';
import CartController from '../../controllers/cartController.js'
const cartController = new CartController()

const cartRoute = Router();

cartRoute.get('/', cartController.getAllCarts)
cartRoute.post('/',  cartController.createCart)
cartRoute.delete('/:id',  cartController.deleteCart)
cartRoute.get('/:id/products',  cartController.productsinCart)
cartRoute.post('/:id/products', cartController.addProductInCart)
cartRoute.delete('/:idcart/products/:idprod', cartController.deleteProductInCart)

export default cartRoute

