import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import brandRoutes from './routes/brandRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/schema.js'
import resolvers from './graphql/resolvers.js'
import authMiddleware from './middlewares/authMiddleware.js'


const app = express()
dotenv.config()

const PORT = process.env.PORT ||3000
app.use(express.json())
app.use(cors())

const server = new ApolloServer({ typeDefs, resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ""
    const user = authMiddleware.extractUserFromToken(token)
    return { user }
  }
})
await server.start()
server.applyMiddleware({ app })

app.use('/auth', authRoutes)
app.use('/brands', brandRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)

app.get('/', (req,res) => {
  res.send('ProductScope API is running!')
})

export default app