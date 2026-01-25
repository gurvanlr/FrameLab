import multer from "multer";

const storage = multer.diskStorage({
  destination:  './public/upload',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const suffixe = file.originalname.split(".");
    const type = suffixe [1]
    cb(null,uniqueSuffix + "." + type);
  }
})

function fileFilter (req, file, cb) {
    if (file.mimetype.startsWith("image/")){
        cb(null, true);
    } else {
        cb(new Error('bad type of file'));
    }
    
 }



export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 10_000_000
    }
 })
