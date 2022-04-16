const { Op } = require('sequelize')
const { Point, Like } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { userId } = req.body
    const { offset, limit, city, district, type } = req.query

    const where = { location: { [Op.like]: '%%' } }

    if (city) where.location = { [Op.like]: `%${city}%` }
    if (district) where.location[Op.like] += `%${district}%`
    if (type) where.type = { [Op.in]: type.split(',') }

    const data = await Point.findAll({
      where,
      offset,
      limit,
      include: { model: Like, where: { userId } },
      order: [['id', 'asc']],
    })

    res.send(data)
  } catch (e) {
    console.log(e)
    res.status(500).send('Oops something went wrong!')
  }
}
