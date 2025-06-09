import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:3030', {
  withCredentials: true,
});

const Chat = () => {
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to socket server: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from socket server`);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium">Chat App</h1>
    </div>
  )
}

export default Chat;