import { Router } from 'express';
import { isAuth } from '../controller/isAuth.js';
import {cartController} from "../../controllers/cartController"

const cartRoute = Router();

cartRouter.get('/', isAuth, cartController.getCart)
cartRouter.post('/', isAuth, cartControllers.createCart)
cartRouter.delete('/:id', isAuth, cartController.deleteCart)
cartRouter.get('/:id/products', isAuth, cartControllers.productsinCart)
cartRouter.post('/:id/products',isAuth, cartControllers.addProductInCart)
cartRouter.delete('/:idcart/products/:idprod', isAuth, cartControllers.deleteProductInCart)

export default cartRoute

