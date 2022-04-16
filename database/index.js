/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs') // file system for grabbing files
const path = require('path') // better than '\/..\/' for portability
const Sequelize = require('sequelize')
require('dotenv').config()

const { seedInitialData } = require('../utils/testData/generateData')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
})

// Load each model file
const models = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .map(function (file) {
      const model = require(path.join(__dirname, file))
      return {
        [model.name]: model.init(sequelize),
      }
    })
)

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models)
}

if (+process.env.FORCE_DB) sequelize.sync({ force: true }).then(() => seedInitialData(models))

module.exports = models
