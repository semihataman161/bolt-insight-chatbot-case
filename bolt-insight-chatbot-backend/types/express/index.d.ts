import { Request } from "express";
import { IUser } from "../../user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}