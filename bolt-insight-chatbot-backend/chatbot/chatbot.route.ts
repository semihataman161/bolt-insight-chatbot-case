import { Router } from "express";
import { startSession, getSessionById, submitAnswer } from "../chatbot/chatbot.controller";

const router = Router();

router.post("/session/start", startSession);
router.get("/session/:sessionId", getSessionById);
router.post("/answer", submitAnswer);

export default router;