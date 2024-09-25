import bcrypt from "bcryptjs";
import { CustomError } from "../customError";
import User, { IUser } from './user.model';

const SALT_ROUNDS = 10;

interface IUserRequest {
    userName: string;
    email: string;
    password: string;
}

export const createUser = async (request: IUserRequest): Promise<void> => {
    const { userName, email, password } = request;

    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (user) {
        throw new CustomError(`User with name: ${userName} or email: ${email} already exists!`, { statusCode: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    });

    await newUser.save();
};

export const login = async (request: { email: string, password: string }): Promise<{ _id: string, userName: string, email: string }> => {
    const { email, password } = request;

    const user = await User.findOne({ email }) as IUser | null;

    if (!user) {
        throw new CustomError(`Invalid credentials!`, { statusCode: 401 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new CustomError(`Invalid credentials!`, { statusCode: 401 });
    }

    return {
        _id: user._id.toString(),
        userName: user.userName,
        email: user.email,
    };
};