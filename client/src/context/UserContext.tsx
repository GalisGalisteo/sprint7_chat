import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

type AuthUser = {
	email: string;
	token?: string;
	id?: string;
}

export type UserContextType = {
	user_id: string | null;
	setUser_id:  Dispatch<SetStateAction<string | null>>;
	//	setUser: Dispatch<SetStateAction<AuthUser | null>>;
	//	isTokenValid: boolean
	//	setIsTokenValid: Dispatch<SetStateAction<boolean>>;
};

type UserContextProviderType = {
	children: React.ReactNode
}

// interface DecodedToken {
// 	userId: string;
// 	iat: number;
// 	exp: number;
// }


export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderType) => {

	const [user_id, setUser_id] = useState<string | null>(null);
	//	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

	useEffect(() => {
		const userDataCookie = document.cookie
			.split('; ')
			.find((row) => row.startsWith('userData='));

		console.log('userDataCookie:', userDataCookie);

		if (userDataCookie) {
			const userDataValue = userDataCookie.split('=')[1];
			console.log('userDataValue:', userDataValue);

			// Decode the URL-encoded value
			const decodedUserDataValue = decodeURIComponent(userDataValue);
			console.log('decodedUserDataValue:', decodedUserDataValue);

			// Parse the JSON string
			const userData = JSON.parse(decodedUserDataValue);
			console.log('userData:', userData);

			setUser_id(userData);
		}


	}, []);

	return <UserContext.Provider value={{ user_id, setUser_id }}>{children}</UserContext.Provider>

};
