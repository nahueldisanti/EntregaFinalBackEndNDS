import product from "../productsModel.js"
import { loggerInfo, loggerError, loggerWarn } from '../../../utils/log4js.js'

export default class ProductsDao {

    async getAllProducts() {
        try{
            const products = await product.find({});
            return products
        }catch(error) {
            loggerError.error (error)
        }
    }

    async getProdctById(id) {
        try{
            const productById = await product.findById(id);
            return productById
        }catch(error) {
            loggerError.error (error)
        }
    }

    async addProduct(addProduct) {
        try{
            const addedProduct = await product(addProduct).save();
            console.log(`Dao: ${productAdded}`)
            return addedProduct

        }catch(error) {
            loggerError.error (error)
        }
    }

    async updateProduct(id, data) {
        try{
            const updateProduct = await product.findByIdAndUpdate(id, data)
            return updateProduct

        }catch(error) {
            loggerError.error (error)
        }
    }

    async deleteProductById(id) {
        try{
            const deleteProd = await product.findByIdAndDelete(id)
            return deleteProd
        }catch(error) {
            loggerError.error (error)
        }
    }

    async getProductByCategory(category) {
        try{
            const productByCategory = await product.find({ category});
            return productByCategory

        }catch(error) {
            loggerError.error (error)
        }
    }
}