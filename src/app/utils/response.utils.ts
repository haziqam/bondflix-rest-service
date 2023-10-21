import {Response} from 'express';

export class ResponseUtil {
    static sendResponse<T>
    (
        res: Response,
        status: number,
        message: string,
        data: T
    ) : Response<T>
    {
        return res.status(status).json({
            success: true,
            message: message,
            data: data
        });
    }

    static sendError<T>
    (
        res: Response,
        status: number,
        message: string,
        data: T
    ) : Response<T>
    {
        return res.status(status).json({
            success: false,
            message: message,
            data: data
        });
    }
}