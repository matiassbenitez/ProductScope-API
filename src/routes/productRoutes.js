import express from 'express'
import { body, param } from 'express-validator'
import productController from '../controllers/productController.js'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'

const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/:id',
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
    handleErrorValidation
  ], productController.getProductById)
router.post('/create',
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isDecimal().withMessage('Product price must be a decimal'),
    body('brandId').isInt().withMessage('Brand ID must be an integer'),
    body('categories').isArray().withMessage('Categories must be an array'),
    body('categories.*').isString().withMessage('Each category must be a string'),
    handleErrorValidation
  ], productController.createProduct)
router.put('/update/:id',
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isDecimal().withMessage('Product price must be a decimal'),
    body('brandId').isInt().withMessage('Brand ID must be an integer'),
    body('categories').isArray().withMessage('Categories must be an array'),
    body('categories.*').isString().withMessage('Each category must be a string'),
    handleErrorValidation
  ], productController.updateProduct)
router.delete('/delete/:id',
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
    handleErrorValidation
  ], productController.deleteProduct)

export default router
