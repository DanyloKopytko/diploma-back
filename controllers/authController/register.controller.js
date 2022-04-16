const bcrypt = require('bcrypt')
const { User } = require('../../database')

module.exports = async (req, res) => {
  try {
    const { name, surname, pass, mail } = req.body

    if (!name || !surname || !pass || !mail) {
      return res.status(400).send('Something is missing')
    }

    const data = await User.findOne({
      where: {
        mail,
      },
    })
    if (data) return res.status(500).send('User Already exists')

    const hash = await bcrypt.hash(pass, 10)

    await User.create({
      name,
      surname,
      pass: hash,
      mail,
      role: User.ROLES.USER,
    })

    return res.status(200).send()
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message)
  }
}
