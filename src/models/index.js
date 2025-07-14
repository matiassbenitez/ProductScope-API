import { Sequelize, DataTypes } from 'sequelize'
import ProductModel from './productModel.js'
import CategoryModel from './categoryModel.js'
import BrandModel from './brandModel.js'
import UserModel from './userModel.js'
import dotenv from 'dotenv'

dotenv.config()
const sequelize = new Sequelize(process.env.DB_URI,{
  logging: false,
})

const Product = ProductModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Brand = BrandModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

Brand.hasMany(Product, { as: 'products', foreignKey: 'brandId' })
Product.belongsTo(Brand, { as: 'brand', foreignKey: 'brandId' })

Product.belongsToMany(Category, {
	through: 'ProductCategories',
	as: 'categories',
	timestamps: false,
  foreignKey: 'productId',
	otherKey: 'categoryId'
})
Category.belongsToMany(Product, {
	through: 'ProductCategories',
	as: 'products',
	timestamps: false,
	foreignKey: 'categoryId',
	otherKey: 'productId'
})

export { Product, Category, Brand, User, sequelize }
