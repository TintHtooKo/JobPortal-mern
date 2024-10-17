const multer =  require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/cv'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  const cvUpload = multer({ storage: storage })

  module.exports = cvUpload