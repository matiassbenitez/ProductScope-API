import { Sequelize, DataTypes } from 'sequelize'
import ProductModel from './productModel.js'
import CategoryModel from './categoryModel.js'
import BrandModel from './brandModel.js'
import UserModel from './userModel.js'
import dotenv from 'dotenv'

dotenv.config()
const sequelize = new Sequelize(process.env.DB_URI)

const Product = ProductModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Brand = BrandModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.belongsToMany(Category, { through: 'ProductCategories', timestamps: false })
Category.belongsToMany(Product, { through: 'ProductCategories', timestamps: false })

export { Product, Category, Brand, User, sequelize }
