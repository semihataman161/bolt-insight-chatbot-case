import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../customError";
import User from './user.model';

const SALT_ROUNDS = 10;

interface IUserRequest {
    userName: string;
    password: string;
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret_key';

export const createUser = async (request: IUserRequest): Promise<void> => {
    const { userName, password } = request;

    const user = await User.findOne({ userName });

    if (user) {
        throw new CustomError(`User with name: ${userName} already exists!`, { statusCode: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
        userName,
        password: hashedPassword,
    });

    await newUser.save();
};

export const login = async (request: IUserRequest): Promise<{ token: string }> => {
    const { userName, password } = request;

    const user = await User.findOne({ userName });

    if (!user) {
        throw new CustomError(`Invalid credentials!`, { statusCode: 401 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new CustomError(`Invalid credentials!`, { statusCode: 401 });
    }

    const token = jwt.sign({ _id: user._id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });

    return { token };
};