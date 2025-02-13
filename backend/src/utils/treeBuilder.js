class TreeBuilder {
    static buildProcessTree(processes) {
        const processMap = new Map();
        let root = null;

        // First pass: create all nodes
        processes.forEach((proc) => {
            processMap.set(proc.pid, {
                ...proc,
                children: [],
            });
        });

        // Second pass: build tree relationships
        processes.forEach((proc) => {
            const node = processMap.get(proc.pid);
            const parent = processMap.get(proc.ppid);

            if (parent) {
                parent.children.push(node);
            } else if (proc.pid === 1 || !processMap.has(proc.ppid)) {
                // PID 1 is usually init/systemd, or handle orphaned processes
                root = node;
            }
        });

        return this.cleanupTree(root || this.findAlternativeRoot(processMap));
    }

    static findAlternativeRoot(processMap) {
        // If we can't find PID 1, use the process with the lowest PID as root
        let lowestPid = Infinity;
        let alternativeRoot = null;

        processMap.forEach((node, pid) => {
            if (pid < lowestPid) {
                lowestPid = pid;
                alternativeRoot = node;
            }
        });

        return alternativeRoot;
    }

    static cleanupTree(node) {
        if (!node) return null;

        // Sort children by PID
        if (node.children) {
            node.children.sort((a, b) => a.pid - b.pid);

            // Recursively clean up children
            node.children = node.children
                .map((child) => this.cleanupTree(child))
                .filter((child) => child !== null);
        }

        return node;
    }
}

export const buildProcessTree = TreeBuilder.buildProcessTree.bind(TreeBuilder);
