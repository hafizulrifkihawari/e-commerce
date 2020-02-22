const productRoute = require('express').Router()

const productController = require('../controllers/productController')

productRoute.post('/', productController.addItem) //
productRoute.get('/', productController.listProduct) //
productRoute.get('/:id', productController.getProductById) //
productRoute.put('/:id', productController.updateProduct) //
productRoute.delete('/:id', productController.deleteProduct) //
productRoute.get('/find/:category', productController.getFilteredList)


module.exports = productRoute