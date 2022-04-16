const { Point } = require('../../database')
const bucketUpload = require('../../utils/aws/s3BucketUploadHouses.util')

module.exports = (req, res) => {
  const { price, userId, location, description, type, phoneNumber, url, longitude, latitude } = req.body
  const housePhotos = req.files && req.files.housePhoto

  Point.create({
    price,
    userId,
    location,
    description,
    type,
    url,
    phoneNumber,
    longitude,
    latitude,
  })
    .then((dataValues) => {
      if (housePhotos) bucketUpload('houses', [[housePhotos]], dataValues.id, Point)
      return res.send()
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).send('Oops something went wrong! :(')
    })
}
