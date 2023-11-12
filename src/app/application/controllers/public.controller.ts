import {Request, Response} from "express";
import {handle_error} from "../../utils/handle_error.utils";
import {upload} from "../../utils/file.utils";

export class PublicController {
    constructor(){

    }


    uploadFile(req: Request, res: Response) {
        try {
            const uploadMiddleware = upload.single('file');

            uploadMiddleware(req, res, (err: any) => {
                if (err) {
                    console.log(err)
                    return handle_error(res, err);
                }
                res.status(200).json({
                    message: 'File uploaded successfully',
                    file: req.file
                });
            });
        } catch (error) {
            console.log(error)
            handle_error(res, error);
        }
    }
}