const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': "jpg",
  'image/jpeg':"jpeg",
  "image/png" : 'png',
  "image/gif" :"gif",
  "image/pjpeg" :"pjpeg",
  "image/jfif" :"jfif",
  "image/pjp" :"pjp",
  "video/mp4" :"mp4",
  "video/m4v" :"m4v",
  "video/webm" :"webm",
  "video/mov" :"mov"
};

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",  
  "image/pjpeg",  
  "image/jfif",  
  "image/pjp",
  "video/mp4",
  "video/m4v",  
  "video/webm",  
  "video/mov"  
]

const fileFilter = function(req,file,cb) {
      if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false)
      }
      cb(null,true);
  };

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename:(req, file, callback) =>{
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const MAX_SIZE = 3000000;

module.exports = multer({storage: storage, fileFilter, limits: {fileSize:MAX_SIZE}}).single('file');