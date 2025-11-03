"use client";
import { useEffect, useState, useRef } from "react";
import { Manager, Socket } from "socket.io-client";
import Image from "next/image";

const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messageToServer, setMessageToServer] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const [isActive, setIsActive] = useState(false);

  // Function to toggle connectivity
  const handleIsActive = () => {
    setIsActive((prev) => {
      const next = !prev;
      setMessageFromServer("");
      if (next) {
        socketRef.current?.connect();
      } else {
        socketRef.current?.disconnect();
        setIsConnected(false);
      }
      return next;
    });
  };

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
      setMessageToServer("");
    }
  };

  return (
    <div
      className={`p-3 z-98 fixed flex flex-col justify-center items-center ml-4 bottom-0 w-72 transition-all duration-300 debug ${
        isActive ? "translate-y-0" : "translate-y-28"
      }`}
    >
      {messageFromServer !== "" && (
        <div className="bg-white/70 rounded-2xl p-4 w-full max-w-64 break-words mb-2">
          {messageFromServer}
        </div>
      )}

      <Image
        src="/images/chatbot.png"
        alt="Chatbot icon"
        width={100}
        height={100}
        draggable={false}
        onClick={handleIsActive}
        className="cursor-pointer"
      />

      <div className="flex items-center gap-2 p-1">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <input
          type="text"
          value={messageToServer}
          onChange={(e) => setMessageToServer(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="bg-white rounded-2xl p-2"
        />
      </div>
    </div>
  );
};

export default Chat;
