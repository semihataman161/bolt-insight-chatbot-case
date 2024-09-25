import Api from "@/service/Api";
import { apiUrl } from "@/constants";

export async function startChatSession(userId: string) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/session/start`,
        data: { userId }
    });
    return response;
};

export async function getNextQuestion(sessionId: string) {
    const response = await Api({
        method: "GET",
        url: `${apiUrl}/question/${sessionId}`,
    });

    return response;
};

export async function submitAnswer(sessionId: string, answer: string) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/answer`,
        data: { sessionId, answer }
    });
    return response;
};