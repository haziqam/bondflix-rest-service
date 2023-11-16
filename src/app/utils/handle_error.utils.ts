import {ZodError} from "zod";
import {ResponseUtil} from "./response.utils";
import {Response} from "express";

export function handle_error(res: Response, error: any): void {
    if (error instanceof ZodError) {
        ResponseUtil.sendError(res, 500, "Unable to process data", error.issues)
    } else if (error instanceof Error) {
        ResponseUtil.sendError(res, 500, error.message, null);
    } else {
        ResponseUtil.sendError(res, 500, "(Uncatched Error) Internal server error", null);
    }
}