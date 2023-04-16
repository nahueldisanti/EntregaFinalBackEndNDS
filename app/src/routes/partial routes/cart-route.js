import { Router } from 'express';
import checkToken from '../../middleware/token.js'
import CartController from '../../controllers/cartController.js'
const cartController = new CartController()

const cartRoute = Router();

cartRoute.get('/', checkToken, cartController.getAllCarts)
cartRoute.post('/', checkToken, cartController.createCart)
cartRoute.delete('/:id', checkToken, cartController.deleteCart)
cartRoute.get('/:id/products', checkToken, cartController.productsinCart)
cartRoute.post('/:id/products',checkToken, cartController.addProductInCart)
cartRoute.delete('/:idcart/products/:idprod', checkToken, cartController.deleteProductInCart)

export default cartRoute

