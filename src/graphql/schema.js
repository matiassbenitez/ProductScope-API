import {gql} from 'apollo-server-express'

const typeDefs = gql`
  type Product {
    id: ID!
    code: String!
    name: String!
    description: String
    brand: Brand!
    categories: [Category!]!
    price: Float!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Brand {
    id: ID!
    name: String!
    products: [Product!]!
  }
  
  input ProductInput {
    name: String!
    description: String
    price: Float!
    brandId: ID!
    categoriesIds: [ID!]!
  }

  type Query {
    products: [Product]!
    product(id: ID!): Product
    productsCount: Int
    brands: [Brand!]!
    categories: [Category!]!
  }
  
  type Mutation {
    createProduct(input: ProductInput): Product
  }
  `
export default typeDefs
