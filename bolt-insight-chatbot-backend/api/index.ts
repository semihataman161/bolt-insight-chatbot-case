import express, { Application } from "express";
import cors from "cors";
import chatbotRoute from "../chatbot/chatbot.route";
import { errorResponder } from "../middleware/errorMiddleware";
import mongoose, { ConnectOptions } from "mongoose";

// Initialize the Express application
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URL as string;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Routes
app.use("/api/chatbot", chatbotRoute);

// Error handling middleware
app.use(errorResponder);

// Start the server
const LOCAL_PORT = 8081;
const PORT = process.env.APP_PORT || LOCAL_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});