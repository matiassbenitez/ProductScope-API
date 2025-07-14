import app from '../index.js'
import request from 'supertest'
import { sequelize } from '../models/index.js'

let newUserId, newBrandId, newCategory, newCategoryId, newProductId

describe(' GET /public', () => {
  beforeAll(async () => {
    await sequelize.query('DELETE FROM users WHERE email = ?', { replacements: ['testuser@test.com'] })
    
    const registerRes = await request(app)
    .post('/auth/register')
    .send({
        email: 'testuser@test.com',
        password: 'testpassword',
        role: 'admin'
      })
      
    console.log('User registered:', registerRes.body)
    
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@test.com',
        password: 'testpassword'
      })
    console.log('User logged in:', loginRes.body)
    
    const token = loginRes.body.token
    newUserId = registerRes.body.user.id
    console.log('User ID:', newUserId)

    const brandRes = await request(app)
      .post('/brands/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Brand'
      })
      newBrandId = brandRes.body.id
      console.log('Brand ID:', newBrandId)
    
      const categoryRes = await request(app)
      .post('/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Category'
      })
      newCategory = categoryRes.body.name
      newCategoryId = categoryRes.body.id
      console.log('Category ID:', newCategoryId)
      console.log('Category NAME:', newCategory)
    
      const productRes = await request(app)
      .post('/products/create')
      .set('Authorization', `Bearer ${token}`) 
      .send({
        code: '00001',
        name: 'Test Product',
        description: 'This is a test product',
        brandId: newBrandId,
        categories: [newCategory],
        price: 100.00
      })
      console.log('Product response:', productRes.status, productRes.body)
      newProductId = productRes.body.id
      console.log('Product ID:', newProductId)
  }),

  afterAll(async () => {
    await sequelize.query('DELETE FROM products WHERE id = ?', { replacements: [newProductId] })
    await sequelize.query('DELETE FROM brands WHERE id = ?', { replacements: [newBrandId] })
    await sequelize.query('DELETE FROM categories WHERE id = ?', { replacements: [newCategoryId] })
    await sequelize.query('DELETE FROM users WHERE email = ?', { replacements: ['testuser@test.com'] })
    await sequelize.close()
  }),
  it('should return a state 200 for GET /', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('ProductScope API is running!')
  }),
  it('should return a state 200 for GET /brands', async () => {
    const response = await request(app).get('/brands')
    expect(response.statusCode).toBe(200)
  }),
  it('should return a state 200 for GET /brands:id', async () => {
    const response = await request(app).get(`/brands/${newBrandId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
  }),
  it('should return a state 200 for GET /categories', async () => {
    const response = await request(app).get('/categories')
    expect(response.statusCode).toBe(200)
  }),
  it('should return a state 200 for GET /categories:id', async () => {
    const response = await request(app).get(`/categories/${newCategoryId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
  }),
  it('should return a state 200 for GET products', async () => {
    const response = await request(app).get('/products')
    expect(response.statusCode).toBe(200)
  }),
  it('should return a state 200 for GET products:id', async () => {
    console.log('Product ID:', newProductId)
    const response = await request(app).get(`/products/${newProductId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
  }),

  it('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/non-existent-route')
    expect(response.statusCode).toBe(404)
  })
})