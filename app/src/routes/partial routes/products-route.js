import { Router } from 'express';
import ProductsController from '../../controllers/productsController.js'
const productsController = new ProductsController();

const productsRoute = Router()

productsRoute.get('/', productsController.getAll)
productsRoute.get('/:id',  productsController.getProdById)
productsRoute.post('/',  productsController.addProduct)
productsRoute.put('/',  productsController.updateProduct)
productsRoute.delete('/:id', productsController.deleteProductById)
productsRoute.get('/category/:category', productsController.getProductByCategory)


export default productsRoute