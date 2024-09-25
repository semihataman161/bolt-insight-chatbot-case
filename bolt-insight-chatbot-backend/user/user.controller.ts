import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createUser, login as loginService } from "../user/user.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  await createUser(req.body);
  res.status(200).json({ data: req.body, message: 'User registered successfully.' });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await loginService(req.body);
  res.status(200).json({ data: user, message: 'Login is successful.' });
});