import processService from "../services/process.service.js";
import { buildProcessTree } from "../utils/treeBuilder.js";

class ProcessController {
    async getProcesses(req, res) {
        try {
            const rawProcesses = await processService.fetchProcessData();
            const processTree = buildProcessTree(rawProcesses);

            res.json(processTree);
        } catch (e) {
            res.status(500).send({
                status: "error",
                message: e.message,
            });
        }
    }

    async getProcessDetails(req, res) {
        try {
            const { pid } = req.params;
            const processDetails = await processService.fetchProcessDetails(
                pid
            );

            if (!processDetails) {
                return res.status(404).json({ error: "Process not found" });
            }

            res.json(processDetails);
        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).json({
                error: "Failed to fetch process details",
                details: error.message,
            });
        }
    }
}

export default new ProcessController();
