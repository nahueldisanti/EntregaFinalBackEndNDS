import { Router } from 'express';
import { checkToken } from '../../middleware/token.js'
import {cartController} from "../../controllers/cartController"

const cartRoute = Router();

cartRouter.get('/', checkToken, cartController.getCart)
cartRouter.post('/', checkToken, cartControllers.createCart)
cartRouter.delete('/:id', checkToken, cartController.deleteCart)
cartRouter.get('/:id/products', checkToken, cartControllers.productsinCart)
cartRouter.post('/:id/products',checkToken, cartControllers.addProductInCart)
cartRouter.delete('/:idcart/products/:idprod', checkToken, cartControllers.deleteProductInCart)

export default cartRoute

