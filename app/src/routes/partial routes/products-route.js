import { Router } from 'express';
import checkToken from '../../middleware/token.js'
import ProductsController from '../../controllers/productsController.js'
const productsController = new ProductsController();

const productsRoute = Router()

productsRoute.get('/', checkToken, productsController.getAll)
productsRoute.get('/:id', checkToken, productsController.getProdById)
productsRoute.post('/', checkToken, productsController.addProduct)
productsRoute.put('/', checkToken, productsController.updateProduct)
productsRoute.delete('/:id', checkToken, productsController.deleteProductById)
productsRoute.get('/category/:category', checkToken, productsController.getProductByCategory)


export default productsRoute