import request from 'supertest'
import app from '../index.js'

describe('GraphQL - createProduct', () => {
  let token

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testadmin@test.com',
        password: '654321'
      })

    token = res.body.token

  })

  it('should create a product using variables', async () => {
    // First consult an existing brand and category
    const queryData = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        query:`
          query {
            brands {
              id
            }
            categories {
              id
            }
          }
        `
      })

    const brandId = queryData.body.data.brands[0]?.id
    const categoryId = queryData.body.data.categories[0]?.id

    expect(brandId).toBeDefined()
    expect(categoryId).toBeDefined()

    const mutation = `
      mutation CreateProduct($input: ProductInput) {
        createProduct(input: $input) {
          id
          name
          price
        }
      }
    `

    const variables = {
      input: {
        name: "Product from test",
        description: "Created from a test",
        price: 42.5,
        brandId,
        categoriesIds: [categoryId]
      }
    }

    const res = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: mutation, variables })

    expect(res.status).toBe(200)
    expect(res.body.data.createProduct).toHaveProperty('id')
    expect(res.body.data.createProduct.name).toBe('Product from test')
  })
})
