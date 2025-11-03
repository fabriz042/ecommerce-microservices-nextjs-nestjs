"use client";
import { useEffect, useState, useRef } from "react";
import { Manager, Socket } from "socket.io-client";

const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messageToServer, setMessageToServer] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const manager = new Manager("ws://localhost:4000", {
      transports: ["websocket"],
    });
    const socket = manager.socket("/");
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("messageFromServer", (data: { message: string }) => {
      setMessageFromServer((prev) => prev + data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Función para enviar mensajes
  const sendMessage = () => {
    if (socketRef.current?.connected && messageToServer.trim()) {
      setMessageFromServer("");
      socketRef.current.emit(`messageFromClient`, {
        clientId: socketRef.current.id,
        message: messageToServer,
      });
    }
  };

  return (
    <div className="p-3">
      {isConnected ? "Connected" : "Disconnected"}
      <div className="flex">
        <input
          type="text"
          value={messageToServer}
          onChange={(e) => setMessageToServer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="bg-white"
        />
        <button onClick={sendMessage} className="cursor-pointer">
          Enviar
        </button>
      </div>
      <div>Respuesta: {messageFromServer}</div>
    </div>
  );
};

export default Chat;
