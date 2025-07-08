const CategoryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }
  )
}
export default CategoryModel