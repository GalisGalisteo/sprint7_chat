import React, { useContext, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { MessageList } from "./components/MessageList";
import SendMessage from "./components/SendMessage";

interface DashboardProps {
	setIsLoggedIn: (param: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
	const navigate = useNavigate();
	const userContext = useContext(UserContext);
	const [refreshMessageList, setRefreshMessageList] = useState("1");

	const logout = () => {
		console.log("Logging out...");
		localStorage.clear();
		props.setIsLoggedIn(false);
		userContext.setIsTokenValid(false)
		navigate("/")
	};

	useEffect(() => {
		if (!userContext.isTokenValid) {
			navigate("/");
		}
	}, [userContext.isTokenValid, navigate]);

	const name = localStorage.getItem("name");

	return (
		<div className="flex-col">
			<>
				<Navbar name={name} />
				<div className="m-5  border-t-4 border-double border-emerald-950 flex-col">
					<div className="bg-blue-300 rounded-lg m-4 p-4 max-h-100 overflow-y-auto shadow-lg">
					<h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
							Chat Messages
						</h2>						<MessageList key={refreshMessageList} />
					</div>
					<SendMessage
						refreshMessageList={() => setRefreshMessageList(new Date().getTime().toString())}
					/>
				</div>
				<div>
					<button
						onClick={logout}
						className="bg-amber-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Logout
					</button>
				</div>
			</>
		</div>
	);
};

export default Dashboard;
