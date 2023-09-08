import { fetchMessages } from "../services";
import React, { useEffect, useRef, useState } from "react";
import Message, { IMessage } from "./Message";
import io from "socket.io-client";
import { PORT } from "../config/config"


export const MessageList: React.FC = () => {
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const getMessageList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchMessages(token);
      if (response.ok) {
        const responseData = await response.json();
        setMessageList(responseData);
      } else {
        console.error("fetching messages");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    getMessageList();
    const socket = io(`ws://localhost:${PORT}`);

    socket.on("new-message", (newMessage: IMessage) => {
      setMessageList((prevMessageList) => [...prevMessageList, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messageList updates
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div className="bg-blue-200 rounded-lg m-4 p-4 max-h-96 overflow-y-auto shadow-lg"
      ref={messageListRef}
    >
      {messageList
        ? messageList.map((message: IMessage) => (
          <Message key={message.id} props={message} />
        ))
        : "something went wrong"}
    </div>
  );
};
