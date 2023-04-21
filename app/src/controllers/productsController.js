import ProductServices from "../Services/productsService.js";
import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
const productsServices = new ProductServices();

export default class ProductsController {

    async getAll(req, res) {
        try{
            const products = await productsServices.getAllProducts()
            res.render('products', products)
        }catch(error) {
            loggerError.error (error)
        }
    }

    async getProdById(req, res) {
        try{
            const productById = await productsServices.getProdctById(req.params.id);
            if(productById != undefined) {
                return res.json(productById)
            } else {
                return res.json({error: error.message})
            }
        }catch(error) {
            loggerError.error (error)
        }
    }

    async addProduct(req, res) {
        try{
            const productAdded = await productDao.addProduct(req.body);
            res.json(productAdded)
        }catch(error) {
            loggerError.error (error)
        }
    }

    async updateProduct(req, res) {
        try{
            const updatedProduct = await productsServices.updateProduct(req.params.id, req.body);
            res.json(updatedProduct)
        }catch(error) {
            loggerError.error (error)
        }
    }

    async deleteProductById(req, res) {
        try{
            const deletedProd = await productsServices.deleteProductById(req.params.id)
            res.json(deletedProd)
        }catch(error) {
            loggerError.error (error)
        }
    }

    async getProductByCategory(req, res) {
        try{
            const productByCategory = await productsServices.getProductByCategory(req.params.category);
            if(productByCategory != undefined) {
                return res.json(productByCategory)
            } else {
                return res.json({error: error.message})
            }

        }catch(error) {
            loggerError.error (error)
        }
    }
}
