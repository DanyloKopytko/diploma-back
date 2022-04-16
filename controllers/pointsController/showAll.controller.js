const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const { Point, Like } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { offset, limit, city, district, type } = req.query

    const where = { location: { [Op.like]: '%%' } }

    if (city) where.location = { [Op.like]: `%${city}%` }
    if (district) where.location[Op.like] += `%${district}%`
    if (type) where.type = { [Op.in]: type.split(',') }

    const query = {
      where,
      offset,
      limit,
      order: [['id', 'asc']],
    }

    if (!req.headers.authorization || req.headers.authorization !== 'undefined') {
      jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN_KEY, function (err, decoded) {
        const userId = decoded.id

        query.include = { model: Like, where: { userId }, required: false }

        Point.findAll(query).then((data) => res.send(data))
      })
    } else {
      Point.findAll(query).then((data) => res.send(data))
    }
  } catch (e) {
    console.log(e)
    res.status(500).send('Oops something went wrong!')
  }
}
