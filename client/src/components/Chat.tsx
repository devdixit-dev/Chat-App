import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:3030', {
  withCredentials: true,
});

const Chat = () => {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected: ${socket.id}`);
    });

    socket.on('receiveMessage', (data: string) => {
      setChat(prev => [...prev, data])
    })

    // socket.on('disconnect', () => {
    //   console.log(`Disconnected from socket server`);
    // });

    return () => {
      socket.disconnect();
    }
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setChat(prev => [...prev, `You: ${message}`]);
      setMessage('');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium">Chat App</h1>
      <div className="flex justify-center items-center gap-4 mt-4">
        <input
          className="border-1 p-2 w-full rounded-md outline-0"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>

      <div className="space-y-2 mb-4 mt-8">
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  )
}

export default Chat;