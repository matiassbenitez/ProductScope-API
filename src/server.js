import app from './index.js'
import { sequelize } from './models/index.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({ alter: true })
  app.listen(PORT, () => {
    console.log(`ProductScope API is running on http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('Unable to connect to the database:', error);
}