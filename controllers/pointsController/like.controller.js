const { Like } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { userId, pointId } = req.body
    const like = await Like.findOne({ where: { userId, pointId } })
    if (like) {
      await Like.destroy({ where: { id: like.id } })
    } else {
      await Like.create({
        userId,
        pointId,
      })
    }
    res.status(200).send('OK')
  } catch (e) {
    res.status(500).send('Oops, something went wrong')
    console.log(e)
  }
}
