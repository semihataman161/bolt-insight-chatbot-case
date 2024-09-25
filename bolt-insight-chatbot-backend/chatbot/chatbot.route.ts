import { Router } from "express";
import { startSession, getNextQuestion, submitAnswer } from "../chatbot/chatbot.controller";

const router = Router();


router.post("/session/start", startSession);
router.get("/question/:sessionId", getNextQuestion);
router.post("/answer", submitAnswer);

export default router;