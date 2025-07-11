import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import brandRoutes from './routes/brandRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'


const app = express()
dotenv.config()

const PORT = process.env.PORT ||3000
app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/brands', brandRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)

app.get('/', (req,res) => {
  res.send('ProductScope API is running!')
})

export default app