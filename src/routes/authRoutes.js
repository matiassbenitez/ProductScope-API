import express from 'express'
import AuthController from '../controllers/authController.js'
import { body } from 'express-validator'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'

const router = express.Router()


router.post('/register',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Role must be either admin or user'),
    handleErrorValidation
  ], AuthController.registerUser)

router.post('/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    handleErrorValidation
  ], AuthController.loginUser)

export default router