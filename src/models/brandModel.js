const BrandModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'Brand',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }
  )
}
export default BrandModel