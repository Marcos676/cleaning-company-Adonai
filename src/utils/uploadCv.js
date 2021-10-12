const path = require('path')
const multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
      cb(null,'CV-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage })

  module.exports = upload