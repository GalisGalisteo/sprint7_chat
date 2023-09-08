import { fetchMessages } from "../services";
import React, { useEffect, useState } from "react";
import Message, { IMessage } from "./Message";
import io from "socket.io-client";
import { PORT } from "../config/config"


export const MessageList: React.FC = () => {
  const [messageList, setMessageList] = useState<IMessage[]>([]);
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

  return (
    <div className="bg-blue-200 rounded-lg m-4 p-4 max-h-96 overflow-y-auto shadow-lg ">
      {messageList
        ? messageList.map((message: IMessage) => (
          <Message key={message.id} props={message} />
        ))
        : "something went wrong"}
    </div>
  );
};
