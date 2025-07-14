import app from '../index.js'
import request from 'supertest'

describe('POST /auth/login', () => {
  beforeAll( async () => {
    await request(app)
      .post('/auth/register')
      .send({
        email: 'testlogin@test.com',
        password: 'testpassword',
      })
  })
  it('should login a user with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'testlogin@test.com',
        password: 'testpassword'
      })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('user')
  })
  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'wrongEmail@test.com',
        password: 'wrongpassword'
      })

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'Invalid email or password')
  })
})