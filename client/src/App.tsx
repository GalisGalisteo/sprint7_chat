import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const App: React.FC = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<div className="App">
			<div className="min-h-screen flex flex-col items-center justify-center bg-color-movement ">
				<img src="chat.png" className="w-20 h-30 mt-4" alt="chat" />
				<div className="app-container  p-6 bg-white rounded-lg shadow-lg m-8">
					{isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
				</div>
			</div>
		</div>
	);
}

export default App;