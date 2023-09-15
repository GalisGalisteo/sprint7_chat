import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import { MessageList } from "./components/MessageList";
import SendMessage from "./components/SendMessage";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [refreshMessageList, setRefreshMessageList] = useState("1");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const logout = () => {
    userContext.setUser_id(null); // Call the function to update user_id
    navigate("/");
  };

  return (
    <div className="flex-col">
      <>
        <Navbar name={name} />
        <div className="m-5  border-t-4 border-double border-emerald-950 flex-col">
          <div className="bg-blue-300 rounded-lg m-4 p-4 max-h-100 overflow-y-auto shadow-lg">
            Chat Messages
            <MessageList key={refreshMessageList} />
          </div>
          <SendMessage
            refreshMessageList={() =>
              setRefreshMessageList(new Date().getTime().toString())
            }
          />
        </div>
        <button
          onClick={logout}
          className="bg-amber-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </>
    </div>
  );
};

export default Dashboard;
