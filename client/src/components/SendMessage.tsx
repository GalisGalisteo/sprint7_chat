import React, { useState } from "react";
import { sendNewMessage } from "../services";

interface SendMessageProps {
  refreshMessageList: () => void;
}

export const SendMessage: React.FC<SendMessageProps> = ({ refreshMessageList }) => {
  const [inputField, setInputValue] = useState("");
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await sendNewMessage(token, user_id, inputField);
      if (response.ok) {
        const data = await response.json();
        refreshMessageList();
        setInputValue("");
        return data;
      } else {
        console.error("Error sending message")
      }
    } catch (error) {
      console.error("an error occurred:", error)
    }
  };

  return (

    <div className=" w-full p-6 bg-white rounded-lg shadow-lg">
      <label htmlFor="messages"></label>
      <input
        className="border rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        id="messages"
        placeholder="Write your message"
        value={inputField}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>

  );
};

export default SendMessage;
