import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {validationResult } from 'express-validator' 

dotenv.config()
const AuthController = {
  registerUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password, role } = req.body
    try {
      const existingUser = await UserModel.findOne({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await UserModel.create({ email, password: hashedPassword, role })
      res.status(201).json({message: 'User registered successfully', user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      } })
    } catch (error) {
      console.error('Error registering user:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  loginUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      const user = await UserModel.findOne( { where: { email } })
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }
      const { id, email: userMail, role } = user
      const payload = {
        id,
        email: userMail,
        role
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
      res.status(200).json({message: 'Login successful', token, user: { id, email: userMail, role } })
    } catch (error) {
      console.error('Error logging in user:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default AuthController