import React, { useEffect, useState } from 'react';
import { startChatSession, getNextQuestion, submitAnswer } from "@/service/Chatbot";

const Chatbot: React.FC = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [question, setQuestion] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string>('');
    const [isFinished, setIsFinished] = useState<boolean>(false);

    useEffect(() => {
        const initializeChat = async () => {
            const { data } = await startChatSession('user-123');
            setSessionId(data.session._id);
            fetchNextQuestion(data.session._id);
        };
        initializeChat();
    }, []);

    const fetchNextQuestion = async (sessionId: string) => {
        const { data } = await getNextQuestion(sessionId);
        setQuestion(data.text);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (sessionId) {
            await submitAnswer(sessionId, answer);
            setAnswer('');
            await fetchNextQuestion(sessionId);
        }
    };

    return (
        <div>
            <h1>Chatbot</h1>
            {isFinished ? (
                <p>Thank you for answering all the questions!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>{question}</p>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Chatbot;