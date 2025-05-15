import { Router } from 'express';
import uploadController from '../src/controllers/uploadcontroller.js';

const router = Router();

router.post('/uploadfile', 
  uploadController.getSingleUpload(), 
  uploadController.uploadSingleFile.bind(uploadController)
);

router.post('/uploadmultiple', 
  uploadController.getMultipleUpload(),
  uploadController.uploadMultipleFiles.bind(uploadController)
);

export default router;
