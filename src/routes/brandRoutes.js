import express from 'express'
import { body, param } from 'express-validator'
import BrandController from '../controllers/brandController.js'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'


const router = express.Router()

router.get('/', BrandController.getAllBrands)
router.get('/:id',
  [
    param('id').isInt().withMessage('Brand ID must be an integer'),
    handleErrorValidation
  ], BrandController.getBrandById)
router.post('/create', 
  [
    body('name').notEmpty().withMessage('Brand name is required'),
    handleErrorValidation
  ], BrandController.createBrand)
router.put('/update/:id',
  [
    param('id').isInt().withMessage('Brand ID must be an integer'),
    body('name').notEmpty().withMessage('Brand name is required'),
    handleErrorValidation
  ], BrandController.updateBrand)
router.delete('/delete/:id',
  [
    param('id').isInt().withMessage('Brand ID must be an integer'),
    handleErrorValidation
  ], BrandController.deleteBrand)

export default router