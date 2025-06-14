import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const Chat = () => {

  const socket = useRef<Socket | null>(null);

  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('')
  const [socketId, setSocketId] = useState('')

  const [messages, setMessages] = useState<string[]>([]);


  useEffect(() => {

    socket.current = io('http://localhost:3030', { withCredentials: true });

    socket.current.on('connect', () => {
      setSocketId(socket.current?.id ?? '')
      console.log(`${socket.current?.id} connected`);
    });

    socket.current.on("message", (message) => {
      setMessages(prev => [...prev, message])
    });

    return () => {
      socket.current?.disconnect();
    }
  }, [])

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    socket.current?.emit('message', {message, room});
    setMessage('')
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium">Welcome to Socket.io</h1>

      <p>User connected: {socketId}</p>

      <form onSubmit={handleSubmit} className=" justify-center items-center gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <input type="text" className="py-2 px-3 bg-zinc-700 border-0 outline-0 rounded-sm" placeholder="enter message here"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="text" className="py-2 px-3 bg-zinc-700 border-0 outline-0 rounded-sm" placeholder="enter room id here"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 flex m-auto mt-4 py-1 px-4 rounded-sm cursor-pointer" type="submit">Send</button>
      </form>
      <div className="flex justify-center mt-4 gap-4 flex-col">
        {messages.map((message, index) => (
          <div key={index} className="py-2 px-6 bg-zinc-700 rounded-sm">
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat;