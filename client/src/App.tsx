import React, { useContext } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { UserContext } from './context/UserContext';

const App: React.FC = () => {
	const { user_id } = useContext(UserContext);

	return (
		<div className="App">
			<div className="min-h-screen flex flex-col items-center justify-center bg-color-movement ">
				<img src="chat.png" className="w-20 h-30 mt-4" alt="chat" />
				<div className="app-container  p-6 bg-white rounded-lg shadow-lg m-8">
					{user_id ? <Dashboard /> : <Login />}
				</div>
			</div>
		</div>
	);
}

export default App;