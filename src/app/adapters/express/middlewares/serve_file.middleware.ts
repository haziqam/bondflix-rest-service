import {ResponseUtil} from "../../../utils/response.utils";
import {NextFunction, Request, Response} from "express";
import path from "path";
import fs from "fs";

export function serve_file(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const filePath = req.filePath;
    if (!filePath) {
        return ResponseUtil.sendError(res, 404, "File path not found", null);
    }

    const fullFilePath = path.join(__dirname, '..', '..', '..', '..', filePath);

    if (fs.existsSync(fullFilePath)) {
        res.sendFile(fullFilePath);
    } else {
        return ResponseUtil.sendError(res, 404, "File not found", null);
    }
}
