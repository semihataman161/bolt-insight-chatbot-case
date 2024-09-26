import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from '../user/user.model';

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Allow these paths without authentication
    const exemptPaths = ['/api/user/login', '/api/user/register', '/api/healthCheck'];

    if (exemptPaths.includes(req.path)) {
        return next(); // Skip authentication for these routes
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden

        // Ensure decoded is of type IUser
        if (decoded && typeof decoded === 'object') {
            req.user = decoded as IUser; // Assert decoded to IUser
            return next(); // Proceed to the next middleware or route handler
        }

        return res.sendStatus(403); // Forbidden if decoded is not valid
    });
};