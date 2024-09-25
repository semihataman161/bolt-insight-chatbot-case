import { Request, Response, NextFunction } from "express";

const INTERNAL_SERVER_ERROR = 500;

const errorResponder = (error: any, req: Request, res: Response, next: NextFunction) => {
  const { message, options } = error;
  let status = INTERNAL_SERVER_ERROR;

  if (options?.hasOwnProperty('statusCode')) {
    status = options.statusCode;
  }

  res.status(status).json({ data: req.body, message });
};

export { errorResponder };