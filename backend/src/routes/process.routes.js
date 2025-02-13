import express from "express";

const router = express.Router();

import processController from "../controllers/process.controller.js";

router.get("/processes", processController.getProcesses);

router.get("/processes/:pid", processController.getProcessDetails);

router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Health check passed",
        timestamp: new Date().toISOString(),
    });
});

export default router;
