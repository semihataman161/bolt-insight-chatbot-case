import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { startNewSession, getSessionBySessionId, submitUserAnswer } from "../chatbot/chatbot.service";

export const startSession = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    const session = await startNewSession(userId);

    res.status(201).json({ id: session?._id, message: "Session started", session });
});

export const getSessionById = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const session = await getSessionBySessionId(sessionId);

    if (!session) {
        res.status(404).json({ message: "Session not found" });
    } else {
        res.status(200).json(session);
    }
});

export const submitAnswer = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, answer } = req.body;
    const session = await submitUserAnswer(sessionId, answer);

    if (!session) {
        res.status(404).json({ message: "Session not found" });
    } else {
        res.status(200).json({ message: "Answer submitted", session });
    }
});