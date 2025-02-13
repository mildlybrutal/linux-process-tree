# Linux Process Tree Visualizer

A web application that visualizes the Linux process hierarchy in real-time using a tree structure. Built with React and Express.js.

## Features

- 🌳 Hierarchical visualization of Linux processes
- 🔄 Real-time process data updates
- 🎯 Process details including PID, PPID, and command
- 🎨 Clean, modern UI with dark mode
- 🚀 Fast and responsive

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

### Backend
- Express.js
- Node.js
- Linux `ps` command integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Linux-based operating system
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/process-tree-visualizer.git
cd process-tree-visualizer
```
2. Install backend dependencies
```bash
cd backend
npm install
```
3. Install frontend dependencies
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```
The server will start on port 3001.

2. Start the frontend development server
```bash
cd frontend
npm run dev
```
The frontend will be available at http://localhost:5173

## API Endpoints
1. GET /api/processes - Fetches the complete process tree
2. GET /api/processes/:pid - Fetches detailed information for a specific process
3. GET /api/health - Health check endpoint

## Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License
This project is licensed under the ISC License.