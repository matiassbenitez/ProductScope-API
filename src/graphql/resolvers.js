//const products = []
import { Product, Category, Brand } from '../models/index.js'

const resolvers = {
  Query: {
    products: async () => await Product.findAll(),
    product: async (_, { id }) => await Product.findByPk(id),
    productsCount: async () => await Product.count(),
    brands: async () => await Brand.findAll(),
    categories: async () => await Category.findAll(),
  },
  Mutation: {
    createProduct: async (_, { input }, context) => {
      if (!context.user) throw new Error('Unauthorized')
      
      const code = 'P' + Date.now()
      const newProduct = await Product.create({
        name: input.name,
        description: input.description,
        price: input.price,
        brandId: input.brandId,
        code,
      });
      if (input.categoriesIds && input.categoriesIds.length > 0) {
        await newProduct.setCategories(input.categoriesIds);
      }
      return newProduct;
    }
  },
  Product: {
    categories: async (product) => await product.getCategories()
    ,
    brand: async (product) => await product.getBrand()
  },
  Category: {
    products: async (category) => await category.getProducts()
  },
  Brand: {
    products: async (brand) => await brand.getProducts()
  }
}

export default resolvers
