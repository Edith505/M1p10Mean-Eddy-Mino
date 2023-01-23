const multer  = require('multer')

const MIME_TIPES ={
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/images/vehiculesPicture')
    },
    filename: function (req, file, callback) {
      var name = Math.floor(Math.random()*Math.floor(147852369)).toString();
      name += Math.floor(Math.random()*Math.floor(987456321)).toString();
      name += Date.now() + '.';

      const extension = MIME_TIPES[file.mimetype];
      name += extension;
    }
  })
  
module.exports = multer({storage}).single('image')