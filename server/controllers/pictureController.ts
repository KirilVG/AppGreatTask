import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/responseMessages";
import pictureService from "../services/pictureService";
import { SUCCESS_PAYLOAD } from "../constants/payloads";
import { IPicture } from "../../shared/types";

const { OK, CREATED } = HttpStatusCode;

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newPicture = await pictureService.create( req.body);
        buildResponse(res, newPicture, CREATED);
    } catch (error) {
        next(error);
    }
}

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const pictures = await pictureService.getAll();
        res.status(OK).json(pictures).end();
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const picture = await pictureService.getById(req.params.id);
        buildResponse(res, picture, OK);
    } catch (error) {
        next(error);
    }
}

async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await pictureService.deleteById(req.params.id);
        buildResponse(res, SUCCESS_PAYLOAD, OK);
    } catch (error) {
        next(error);
    }
}

async function updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const requestBody: IPicture = req.body;
        const picture = await pictureService.updateById(req.params.id, requestBody);
        buildResponse(res, picture, OK);
    } catch (error) {
        next(error)
    }
}

function buildResponse(res: Response, payload: object, status: number): Response {
    return res.status(status).json(payload).end();
}

export default { create, getAll, getById, deleteById, updateById };