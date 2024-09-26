import React, { useEffect, useState, useCallback } from "react";
import {
  startChatSession,
  getSessionById,
  submitAnswer,
} from "@/service/Chatbot";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import TypeWriterEffect from "@reusable-ui-tr/react-type-writer-effect";
import { jwtDecode } from "jwt-decode";

interface IJwtPayload {
  _id: string;
}

interface IQuestion {
  answer?: string;
  text: string;
}

interface ISessionData {
  currentQuestionIndex: number;
  endedAt?: string;
  startedAt?: string;
  questions: IQuestion[];
}

const Chatbot: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [sessionData, setSessionData] = useState<ISessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAllQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const fetchSessionQuestions = useCallback(async (sessionId: string) => {
    setLoading(true);
    const { data } = await getSessionById(sessionId);
    setSessionData(data);
    setAllQuestionsAnswered(Boolean(data.endedAt));
    setLoading(false);
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      const token = localStorage.getItem("token") ?? "";
      let userId = "defaultUserId";

      try {
        const decoded = jwtDecode<IJwtPayload>(token);
        userId = decoded._id;
      } catch (error) {
        console.error("Token decoding failed:", error);
      }

      // Start the chat session
      const { data } = await startChatSession(userId);
      setSessionId(data.session._id);
      fetchSessionQuestions(data.session._id);
    };

    initializeChat();
  }, [fetchSessionQuestions]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sessionId) {
      setLoading(true);
      await submitAnswer(sessionId, answer);
      setAnswer("");
      await fetchSessionQuestions(sessionId);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Chatbot
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxHeight: 500,
          overflowY: "auto",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <List>
          {sessionData?.questions.map((chat, index) => (
            <ListItem key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 1,
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: "#e0f7fa",
                }}
              >
                <ListItemText
                  primary={
                    <Typography color="primary" component="span">
                      {index === sessionData?.questions.length - 1 &&
                      !sessionData?.questions[index].answer ? (
                        <TypeWriterEffect text={`Bot: ${chat.text}`} />
                      ) : (
                        `Bot: ${chat.text}`
                      )}
                    </Typography>
                  }
                  secondary={
                    chat.answer && (
                      <Typography color="textSecondary">
                        You: {chat.answer}
                      </Typography>
                    )
                  }
                />
              </Box>
            </ListItem>
          ))}
          {isAllQuestionsAnswered && (
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 1,
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: "#e0f7fa",
                }}
              >
                <ListItemText
                  primary={
                    <Typography color="primary">
                      Bot: Thank you for answering all the questions!
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          )}
        </List>
      </Paper>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          variant="outlined"
          fullWidth
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          required
          sx={{ marginBottom: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || isAllQuestionsAnswered}
        >
          {loading ? <CircularProgress size={24} /> : "Answer"}
        </Button>
      </form>
    </Box>
  );
};

export default Chatbot;
