import SessionModel, { ISession, IQuestion } from "./session.model";

const predefinedQuestions: IQuestion[] = [
    { text: "What is your favorite breed of cat, and why?" },
    { text: "How do you think cats communicate with their owners?" },
    { text: "Have you ever owned a cat? If so, what was their name and personality like?" },
    { text: "Why do you think cats love to sleep in small, cozy places?" },
    { text: "What’s the funniest or strangest behavior you’ve ever seen a cat do?" },
    { text: "Do you prefer cats or kittens, and what’s the reason for your preference?" },
    { text: "Why do you think cats are known for being independent animals?" },
    { text: "How do you think cats manage to land on their feet when they fall?" },
    { text: "What’s your favorite fact or myth about cats?" },
    { text: "How would you describe the relationship between humans and cats in three words?" }
];

export const startNewSession = async (userId: string): Promise<ISession> => {
    const newSession = new SessionModel({ userId, questions: predefinedQuestions });
    return newSession.save();
};

export const getCurrentQuestion = async (sessionId: string): Promise<IQuestion | null> => {
    const session = await SessionModel.findById(sessionId);
    if (!session || session.currentQuestionIndex >= session.questions.length) {
        return null;
    }
    return session.questions[session.currentQuestionIndex];
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