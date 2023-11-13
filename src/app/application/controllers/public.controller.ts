import {Request, Response} from "express";
import {handle_error} from "../../utils/handle_error.utils";
import {deleteFile} from "../../utils/delete_file.utils";
import {ResponseUtil} from "../../utils/response.utils";

export class PublicController {
    constructor(){

    }

    uploadFile(req: Request, res: Response) {
        try {
            return ResponseUtil.sendResponse(res, 200, "File Uploaded Successfully", req.file);
        } catch (error) {
            handle_error(res, error);
        }
    }

    async deleteFile(req: Request, res: Response) {
        try {
            const filename = req.body.filename;
            await deleteFile(filename);
            return ResponseUtil.sendResponse(res, 200, "Success file deletion", null)
        } catch (error) {
            console.log(error)
            handle_error(res, error);
        }
    }
}