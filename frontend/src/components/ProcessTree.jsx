import React, { useState, useEffect } from "react";
import { FolderTree, RefreshCcw } from "lucide-react";

const ProcessTree = () => {
    const [processData, setProcessData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProcessData();
    }, []);

    const fetchProcessData = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3001/api/processes");
            const data = await response.json();
            setProcessData(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch process data");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderProcessNode = (node, level = 0) => {
        if (!node) return null;

        return (
            <div key={node.pid} className="flex flex-col">
                <div
                    className="flex items-center p-2 hover:bg-gray-800 transition-colors"
                    style={{ marginLeft: `${level * 24}px` }}
                >
                    <FolderTree className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-mono text-gray-300">
                        {node.pid} - {node.command}
                    </span>
                </div>
                <div className="ml-4">
                    {node.children?.map((child) =>
                        renderProcessNode(child, level + 1)
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-100">
                        Linux Process Tree Visualizer
                    </h1>
                    <button
                        onClick={fetchProcessData}
                        className="px-4 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Refresh
                    </button>
                </div>

                {loading && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {processData && !loading && (
                    <div className="bg-gray-800 shadow rounded-lg p-6 overflow-auto max-h-[800px]">
                        {renderProcessNode(processData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessTree;
