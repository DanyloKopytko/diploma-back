const Sequelize = require('sequelize')

class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
          foreignKey: true,
        },
        pointId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
          foreignKey: true,
        },
      },
      {
        tableName: 'Like',
        timestamps: true,
        sequelize,
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' })
    this.belongsTo(models.Point, { foreignKey: 'pointId' })
  }
}

module.exports = Like
