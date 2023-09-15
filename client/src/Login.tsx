import React from 'react';

const Login: React.FC = () => {
	const handleGoogleLogin = async () => {
		try {
			window.location.href = "http://localhost:8000/api/auth/google";
		} catch (error) {
			console.error("Error during Google login:", error);
		}
	};

	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">Login</h2>
			<p>Please click the button below to log in with Google:</p>
			<a href="#" onClick={handleGoogleLogin}>
				<button
					className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
				>
					Log In with Google
				</button>
			</a>
		</>
	);
};

export default Login;
