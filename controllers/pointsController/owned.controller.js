const { Op } = require('sequelize')
const { Point, Like } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { userId } = req.body
    const { offset, limit, city, district, type } = req.query

    const where = { userId, location: { [Op.like]: '%%' } }

    if (city) where.location = { [Op.like]: `%${city}%` }
    if (district) where.location[Op.like] += `%${district}%`
    if (type) where.type = { [Op.in]: type.split(',') }

    res.status(200).send(
      await Point.findAll({
        where,
        order: [['id', 'asc']],
        offset,
        limit,
        include: { model: Like, where: { userId }, required: false },
      })
    )
  } catch (e) {
    console.log(e)
    res.status(500).send('Error')
  }
}
