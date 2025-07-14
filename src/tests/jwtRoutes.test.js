import app from '../index.js'
import request from 'supertest'
import { sequelize } from '../models/index.js'

let token, newBrandId, newCategoryId, newCategoryName, newProductId
describe('jwtRoutes', () => {
  beforeAll(async () => {
    const resLogin = await request(app)
      .post('/auth/login')
      .send({
        email: 'testadmin@test.com',
        password: '654321'
      })
      token = resLogin.body.token
    })
  afterAll(async () => {
      await sequelize.query('DELETE FROM products WHERE id = ?', { replacements: [newProductId] })
      await sequelize.query('DELETE FROM brands WHERE id = ?', { replacements: [newBrandId] })
      await sequelize.query('DELETE FROM categories WHERE id = ?', { replacements: [newCategoryId ] })
  })
  it('should access a protected brand route with valid JWT', async () => {
    const response = await request(app)
      .post('/brands/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Protected Brand'
      })
      expect(response.statusCode).toBe(201)
      newBrandId = response.body.id
      console.log('New Brand ID:', newBrandId)
  })
  it('should return 401 for protected brand route without JWT', async () => {
    const response = await request(app)
      .post('/brands/create')
      .send({
        name: 'Unauthorized Brand'
      })
    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'No token provided or invalid format')
  })
  it('should access a protected category route with valid JWT', async () => {
    const response = await request(app)
      .post('/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Protected Category'
      })
      expect(response.statusCode).toBe(201)
      newCategoryId = response.body.id
      newCategoryName = response.body.name
      console.log('New Category ID:', newCategoryId)
      console.log('New Category Name:', newCategoryName)
  })
  it('should return 401 for protected category route without JWT', async () => {
    const response = await request(app)
      .post('/categories/create')
      .send({
        name: 'Unauthorized Brand'
      })
    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'No token provided or invalid format')
  })
  it('should access a protected product route with valid JWT', async () => {
    const response = await request(app)
      .post('/products/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: '00001',
        name: 'Protected Product',
        description: 'This is a protected product',
        brandId: newBrandId,
        categories: [newCategoryName],
        price: 100.00
      })
      expect(response.statusCode).toBe(201)
      newProductId = response.body.id
      console.log('New Product ID:', newProductId)
  })
  it('should return 401 for protected product route without JWT', async () => {
    const response = await request(app)
      .post('/products/create')
      .send({
        code: '00002',
        name: 'Unauthorized Brand',
        description: 'This is an unauthorized product',
        brandId: newBrandId,
        categories: [newCategoryName],
        price: 100.00
      })
    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'No token provided or invalid format')
  })
})
