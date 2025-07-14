import express from 'express'
import { body, param } from 'express-validator'
import productController from '../controllers/productController.js'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'
import authMiddleware from '../middlewares/authMiddleware.js' 

const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/:id',
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
    handleErrorValidation
  ], productController.getProductById)

router.post('/create', authMiddleware.verifyToken, authMiddleware.checkRole('admin'),
  [
    body('code').notEmpty().withMessage('Product code is required'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Product description is required'),
    body('price').isDecimal().withMessage('Product price must be a decimal'),
    body('brandId').isInt().withMessage('Brand ID must be an integer'),
    body('categories').isArray().withMessage('Categories must be an array'),
    body('categories.*').isString().withMessage('Each category must be a string'),
    body('available').optional().isBoolean().withMessage('Available must be a boolean'),
    handleErrorValidation
  ], productController.createProduct)
router.put('/update/:id',authMiddleware.verifyToken, authMiddleware.checkRole('admin'),
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
    body('name').optional().notEmpty().withMessage('Product name is required'),
    body('price').optional().isDecimal().withMessage('Product price must be a decimal'),
    body('brandId').optional().isInt().withMessage('Brand ID must be an integer'),
    body('categories').optional().isArray().withMessage('Categories must be an array'),
    body('categories.*').optional().isString().withMessage('Each category must be a string'),
    handleErrorValidation
  ], productController.updateProduct)

router.delete('/delete/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'),
  [
    param('id').isInt().withMessage('Product ID must be an integer'),
    handleErrorValidation
  ], productController.deleteProduct)

export default router
