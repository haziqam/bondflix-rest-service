import {ResponseUtil} from "../../../utils/response.utils";
import {NextFunction, Request, Response} from "express";
import path from "path";
import fs from "fs";

export function serve_file(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const filePath = req.filePath;
    let fullFilePath = path.join(__dirname, '..', '..', '..', '..', filePath);

    if (!fs.existsSync(fullFilePath)) {
        const defaultFiles = {
            content: 'uploads/contents/default.mp4',
            thumbnail: 'uploads/thumbnails/default.png',
            picture: 'uploads/pictures/default.png'
        };

        //@ts-ignore
        const fileType = req.fileType;
        if (fileType in defaultFiles) {
            //@ts-ignore
            fullFilePath = path.join(__dirname, '..', '..', '..', '..', defaultFiles[fileType]);
        } else {
            return ResponseUtil.sendError(res, 404, "File path not found and no default file for type", null);
        }
    }

    res.sendFile(fullFilePath);
}
