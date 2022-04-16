const Sequelize = require('sequelize')

class Point extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        longitude: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        latitude: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['PCR', 'Vaccination', 'PCR and Vaccination'],
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
        },
        photoUrl: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
          defaultValue: [],
        },
      },
      {
        tableName: 'Points',
        timestamps: true,
        sequelize,
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' })
    this.hasMany(models.Like, { foreignKey: 'pointId' })
  }
}

module.exports = Point
