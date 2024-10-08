import mongoose, { Schema, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - userName
 *        - password
 *       properties:
 *         userName:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         userName: 'semihataman'
 *         password: '1234'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * 
 * /api/user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *     security: []
 * 
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               userName: 
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             userName: semihataman16
 *             password: '1234'
 *     responses:
 *       200:
 *         description: Login is successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *     security: []
 */

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    userName: string;
    password: string;
}

const UserSchema: Schema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>('User', UserSchema);