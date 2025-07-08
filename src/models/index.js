import { Sequelize, DataTypes } from 'sequelize'
import ProductModel from './productModel.js'
import CategoryModel from './categoryModel.js'
import BrandModel from './brandModel.js'

const sequelize = new Sequelize(process.env.DB_URI)

const Product = ProductModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Brand = BrandModel(sequelize, DataTypes)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.belongsToMany(Category, { through: 'ProductCategories' })
Category.belongsToMany(Product, { through: 'ProductCategories' })

export { Product, Category, Brand, sequelize }
