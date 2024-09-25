import Api from "@/service/Api";
import { apiUrl } from "@/constants";

export async function startChatSession(userId: string) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/chatbot/session/start`,
        data: { userId }
    });
    return response;
};

export async function getNextQuestion(sessionId: string) {
    const response = await Api({
        method: "GET",
        url: `${apiUrl}/api/chatbot/question/${sessionId}`,
    });

    return response;
};

export async function submitAnswer(sessionId: string, answer: string) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/chatbot/answer`,
        data: { sessionId, answer }
    });
    return response;
};