import { SessionModel, ISession } from "../chatbot/chatbot.model";

const generateQuestions = async (): Promise<{ text: string }[]> => {
    const questions = [
        { text: "What is your name?" },
        { text: "How are you feeling today?" },
        { text: "What is your favorite color?" }
    ];
    return questions;
};

export const startNewSession = async (): Promise<ISession> => {
    const questions = await generateQuestions();
    const newSession = new SessionModel({ questions });
    return newSession.save();
};

export const getCurrentQuestion = async (sessionId: string): Promise<{ question: string } | null> => {
    const session = await SessionModel.findById(sessionId);
    if (!session || session.currentQuestionIndex >= session.questions.length) {
        return null;
    }
    return { question: session.questions[session.currentQuestionIndex].text };
};

export const submitUserAnswer = async (sessionId: string, answer: string): Promise<ISession | null> => {
    const session = await SessionModel.findById(sessionId);
    if (!session) {
        return null;
    }

    session.questions[session.currentQuestionIndex].answer = answer;
    session.currentQuestionIndex++;

    if (session.currentQuestionIndex >= session.questions.length) {
        session.endedAt = new Date();
    }

    return session.save();
};