import { exec } from "child_process";
import exp from "constants";
import util from "util";

const execPromise = util.promisify(exec);

class ProcessService {
    async fetchProcessData() {
        try {
            // Getting basic process information
            const { stdout } = await execPromise(
                "ps -eo pid,ppid,comm --no-headers"
            );

            return this.parseProcessOutput(stdout);
        } catch (error) {
            console.error("Service Error:", error);
            throw new Error("Failed to execute process command");
        }
    }

    async fetchProcessDetails(pid) {
        try {
            // Getting detailed information for a specific process
            const { stdout } = await execPromise(
                `ps -p ${pid} -o pid,ppid,comm,pcpu,pmem,time,etime,user --no-headers`
            );

            if (!stdout.trim()) {
                return null;
            }

            return this.parseProcessDetails(stdout);
        } catch (error) {
            console.error("Service Error:", error);
            throw new Error(`Failed to fetch details for process ${pid}`);
        }
    }

    parseProcessOutput(stdout) {
        return stdout
            .trim()
            .split("\n")
            .map((line) => {
                const [pid, ppid, ...commParts] = line.trim().split(/\s+/);
                return {
                    pid: parseInt(pid),
                    ppid: parseInt(ppid),
                    command: commParts.join(" "),
                };
            });
    }

    parseProcessDetails(stdout) {
        const [pid, ppid, comm, cpu, mem, time, elapsed, user] = stdout
            .trim()
            .split(/\s+/);

        return {
            pid: parseInt(pid),
            ppid: parseInt(ppid),
            command: comm,
            cpu_usage: parseFloat(cpu),
            memory_usage: parseFloat(mem),
            running_time: time,
            elapsed_time: elapsed,
            user: user,
        };
    }
}

export default new ProcessService();
