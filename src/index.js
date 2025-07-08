import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT ||3000
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
  res.send('ProdcutScope API is running!')
})

export default app