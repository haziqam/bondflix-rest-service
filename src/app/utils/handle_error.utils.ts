import {ZodError} from "zod";
import {ResponseUtil} from "./response.utils";
import {Response} from "express";

export function handle_error(res: Response, error: any): void {
    if (error instanceof ZodError) {
        console.log(error.issues);
        ResponseUtil.sendError(res, 500, "Unable to process data", error.issues)
    } else {
        ResponseUtil.sendError(res, 500, "Internal server error", null);
    }

}