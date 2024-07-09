import { ErrorType } from "@/constants/errorMessages";

export class AppError extends Error {
    constructor(message: string, public errorType: string, public cause?: Error) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleError = (error: AppError): string => {
    const httpStatus = String(error.errorType || ErrorType.UnknownError);

    return httpStatus;
};