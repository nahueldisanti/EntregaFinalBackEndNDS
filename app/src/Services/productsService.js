import product from "../persistance/models/productsModel.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'
import ProductsDao from "../persistance/models/DAO/productsDao.js"
import moment from 'moment'

const productDao = new ProductsDao()

export default class ProductServices {

    async getAllProducts() {
        try{
            const prods = await productDao.getAllProducts()
            return prods
        }catch(error) {
            loggerError.error (error)
        }
    }

    async getProdById(id) {
        try{
            const productById = await productDao.getProdctById(id);
            return productById
        }catch(error) {
            loggerError.error (error)
        }
    }

    async addProduct(product) {
        try{
            const newProduct = {
                timestamp: moment().format('L LTS'),
                name: product.name,
                description: product.description, 
                category:product.category, 
                image: product.img,
                stock:product.stock, 
                price:product.price
            }

            const productAdded = await productDao.addProduct(newProduct);
            return productAdded
        }catch(error) {
            loggerError.error (error)
        }
    }

    async updateProduct(id, product) {
        try{
            const newProduct = {
                timestamp: moment().format('L LTS'),
                name: product.name,
                description: product.description, 
                category:product.category, 
                image: product.img,
                stock:product.stock, 
                price:product.price
            }

            const updatedProduct = await productDao.updateProduct(id, newProduct);
            return updatedProduct

        }catch(error) {
            loggerError.error (error)
        }
    }

    async deleteProductById(id) {
        try{
            const deletedProd = await productDao.deleteProductById(id)
            return deletedProd

        }catch(error) {
            loggerError.error (error)
        }
    }

    async getProductByCategory(category) {
        try{
            const productByCategory = await productDao.getProductByCategory(category);
            return productByCategory 

        }catch(error) {
            loggerError.error (error)
        }
    }
}
