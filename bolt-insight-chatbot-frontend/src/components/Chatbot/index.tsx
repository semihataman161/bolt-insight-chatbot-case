import React, { useState, useEffect } from "react";
import { startSession, getNextQuestion, submitAnswer } from "@/service/Chatbot";

interface Question {
    id: string;
    text: string;
}

const Chatbot: React.FC = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [answer, setAnswer] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initiateSession = async () => {
            const session = await startSession();
            setSessionId(session.id);
            const firstQuestion = await getNextQuestion(session.id);
            setQuestion(firstQuestion);
            setLoading(false);
        };

        initiateSession();
    }, []);

    const handleSubmitAnswer = async () => {
        if (sessionId && answer) {
            setLoading(true);
            await submitAnswer(sessionId, answer);
            setAnswers([...answers, answer]);
            setAnswer("");
            const nextQuestion = await getNextQuestion(sessionId);
            setQuestion(nextQuestion);
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <h2>Chatbot</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>{question?.text}</p>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button onClick={handleSubmitAnswer}>Submit</button>
                    <div>
                        <h3>Previous Answers:</h3>
                        <ul>
                            {answers.map((ans, idx) => (
                                <li key={idx}>{ans}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;