const { Point } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { id } = req.params

    res.send(await Point.findOne({ where: { id } }))
  } catch (e) {
    console.log(e)
    res.status(500).send('Oops something went wrong!')
  }
}
