const { Point } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { id } = req.params

    await Point.destroy({ where: { id } })
    res.status(200).send('Deleted')
  } catch (e) {
    console.log(e)
    res.status(400).send('Error')
  }
}
