import express, { Application } from "express";
import cors from "cors";
import { errorResponder } from "../middleware/errorMiddleware";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import userRoute from "../user/user.route";
import chatbotRoute from "../chatbot/chatbot.route";
import { authenticateToken } from "../middleware/authenticationMiddleware";

// Initialize the Express application
const app: Application = express();

dotenv.config();

// Middleware
const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Swagger
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "bolt-insight-chatbot-backend",
            version: "1.0.0",
            description: "Express.js and MongoDb Backend API",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Semih Ataman",
                email: "semihataman16@gmail.com",
            },
        },
        servers: [
            {
                url: '/',  // Adjust the server URL if necessary
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./chatbot/*.ts", "./user/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI as string;
if (!mongoUri) {
    throw new Error('MONGODB_URI not defined in environment variables');
}
mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Apply JWT authentication middleware globally, this will apply to all routes below
app.use(authenticateToken);

// Routes
app.use('/api/user', userRoute);
app.use("/api/chatbot", chatbotRoute);

app.use('/api/healthCheck', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found!' });
});

// Error handling middleware
app.use(errorResponder);

// Start the server
const LOCAL_PORT = 8081;
const PORT = process.env.APP_PORT ?? LOCAL_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
