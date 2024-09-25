import Api from "@/service/Api";
import { apiUrl } from "@/constants";

export async function startSession() {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/user/login`,
    });
    return response;
};

export async function getNextQuestion(sessionId: string) {
    const response = await Api({
        method: "POST",
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