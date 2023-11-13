import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = 'uploads/';
        switch(file.fieldname) {
            case 'content_file':
                dest = path.join(dest, 'contents/');
                break;
            case 'thumbnail_file':
                dest = path.join(dest, 'thumbnails/');
                break;
            case 'picture_file':
                dest = path.join(dest, 'pictures/');
                break;
            default:
                dest = path.join(dest, 'tmp/')
        }
        fs.mkdirSync(dest, { recursive: true });

        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
export const uploadFile = multer({ storage: storageFile });