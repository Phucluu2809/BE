import multer from 'multer';
import path from 'path';

class UploadController {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './src/uploads');
      },
      filename: (req, file, cb) => {
        const filenameend = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + filenameend);
      }
    });

    this.upload = multer({ storage: this.storage });
  }

  async uploadSingleFile(req, res) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Please upload a file' });
      }
      res.status(200).json({ 
        success: true,
        file 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: 'Error uploading file' 
      });
    }
  }

  async uploadMultipleFiles(req, res) {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'Please choose files' });
      }
      res.status(200).json({ 
        success: true,
        files 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: 'Error uploading files' 
      });
    }
  }

  // Middleware getters
  getSingleUpload() {
    return this.upload.single('myFile');
  }

  getMultipleUpload() {
    return this.upload.array('myFile', 12);
  }
}

const uploadController = new UploadController();
export default uploadController; 