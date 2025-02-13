import express from "express";
import cors from "cors";

import processRoutes from "./routes/process.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use("/api", processRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Application Error:", error.stack);
    res.status(500).json({
        error: "Internal server error",
        details: error.message,
    });
});

export default app;
