import type { Request, Response, NextFunction } from "express";
import type { Document } from "mongoose";
import type { IBar, IEvent, IIngredient, IPicture, IUser } from "../shared/types.js";

export interface IEnvironmentConfig {
    port: number;
    saltRounds: number;
    connectionString: string;
}

export interface IConfig {
    [key: string]: IEnvironmentConfig;
}

export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

export type RouteDefinition = {
    method: string;
    path: string;
    middleware?: MiddlewareFunction[];
    handler: (req: Request, res: Response) => void;
}

export type DBPicture = mongoose.Document<unknown, {}, IPicture> & 
    IPicture & { _id: mongoose.Types.ObjectId; };