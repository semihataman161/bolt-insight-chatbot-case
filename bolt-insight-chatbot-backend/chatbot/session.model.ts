import mongoose, { Document, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The text of the question.
 *         answer:
 *           type: string
 *           description: The user's answer to the question (optional).
 *       example:
 *         text: "What is your favorite breed of cat, and why?"
 *         answer: "Persian, because they are fluffy."
 *
 *     Session:
 *       type: object
 *       required:
 *        - userId
 *        - questions
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user participating in the session.
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *           description: The list of questions and their answers in the session.
 *         currentQuestionIndex:
 *           type: integer
 *           description: The index of the current question in the session.
 *         startedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the session started.
 *         endedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the session ended (optional).
 *       example:
 *         userId: '64bd2f9e4f6ef0123456789a'
 *         questions:
 *           - text: "What is your favorite breed of cat, and why?"
 *             answer: "Persian, because they are fluffy."
 *         currentQuestionIndex: 1
 *         startedAt: '2024-09-26T12:00:00.000Z'
 *         endedAt: '2024-09-26T12:15:00.000Z'
 */

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: The session management API
 *
 * /api/chatbot/session/start:
 *   post:
 *     summary: Start a new session for a user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             example:
 *               userId: '64bd2f9e4f6ef0123456789a'
 *     responses:
 *       201:
 *         description: Session started successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       500:
 *         description: Some server error
 *
 * /api/chatbot/session/{sessionId}:
 *   get:
 *     summary: Retrieve a session by its ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID
 *     responses:
 *       200:
 *         description: Session data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Some server error
 *
 * /api/chatbot/answer:
 *   post:
 *     summary: Submit an answer to the current session question
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               answer:
 *                 type: string
 *             example:
 *               sessionId: '64bd2f9e4f6ef0123456789a'
 *               answer: "Persian, because they are fluffy."
 *     responses:
 *       200:
 *         description: Answer submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Some server error
 */

export interface IQuestion {
  text: string;
  answer?: string;
}

export interface ISession extends Document {
  userId: string;
  questions: IQuestion[];
  currentQuestionIndex: number;
  startedAt: Date;
  endedAt?: Date;
}

const QuestionSchema: Schema = new Schema({
  text: { type: String, required: true },
  answer: { type: String },
});

const SessionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  questions: [QuestionSchema],
  currentQuestionIndex: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
});

const SessionModel = mongoose.model<ISession>("Session", SessionSchema);

export default SessionModel;
