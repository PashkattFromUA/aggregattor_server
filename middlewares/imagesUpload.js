import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeFileName = file.originalname.replace(/\s/g, '_');  
    cb(null, `${uniqueSuffix}-${safeFileName}`); 
  },
});


export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
