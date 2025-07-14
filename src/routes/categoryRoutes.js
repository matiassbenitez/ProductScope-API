import express from 'express'
import { body, param } from 'express-validator'
import categoryController from '../controllers/categoryController.js'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', categoryController.getAllCategories)
router.get('/:id',
  [
    param('id').isInt().withMessage('Category ID must be an integer'),
    handleErrorValidation
  ], categoryController.getCategoryById)

router.post('/create', authMiddleware.verifyToken, authMiddleware.checkRole('admin'),
  [
    body('name').notEmpty().withMessage('Category name is required'),
    handleErrorValidation
  ], categoryController.createCategory)

router.put('/update/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'),
  [
    param('id').isInt().withMessage('Category ID must be an integer'),
    body('name').notEmpty().withMessage('Category name is required'),
    handleErrorValidation
  ], categoryController.updateCategory)

router.delete('/delete/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'),
  [
    param('id').isInt().withMessage('Category ID must be an integer'),
    handleErrorValidation
  ], categoryController.deleteCategory)

export default router
