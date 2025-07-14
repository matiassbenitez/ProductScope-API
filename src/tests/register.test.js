import app from '../index.js'
import request from 'supertest'
import { sequelize } from '../models/index.js'

describe('POST /auth/register', () => {
  beforeEach(async () => {
    await sequelize.query('DELETE FROM users WHERE email = ?',{ replacements: ['testuser@test.com'] })
  })

  afterAll(async () => {
    await sequelize.query('DELETE FROM users WHERE email = ?',{ replacements: ['testuser@test.com'] })
    await sequelize.close()
  })

  it('should register a new user with valid data', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@test.com',
        password: 'testpassword'
      })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('message', 'User registered successfully')
    expect(response.body).toHaveProperty('user')
  })
  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@test.com',
        // password is missing
      })
    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })
  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        // email is missing
        password: 'testpassword',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })
  it('should return 409 for existing user', async () => {
    // Register the user first
    await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@test.com',
        password: 'testpassword'
      })
    // Try to register the same user again
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@test.com',
        password: 'testpassword'
      })
    expect(response.statusCode).toBe(409)
    expect(response.body).toHaveProperty('error', 'User already exists')
  })
})