import { Server } from 'socket.io';

let io; // Declare 'io' to export it later

// Function to initialize Socket.io with the server instance
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

// Export the 'io' instance so it can be used in other files
export const getIo = () => io;