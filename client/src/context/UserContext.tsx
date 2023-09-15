import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

export type UserContextType = {
	user_id: string | null;
	setUser_id: Dispatch<SetStateAction<string | null>>;
	name: string | null;
};

type UserContextProviderType = {
	children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderType) => {

	const [user_id, setUser_id] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);

	useEffect(() => {
		const userDataCookie = document.cookie
			.split('; ')
			.find((row) => row.startsWith('userData='));

		if (userDataCookie) {
			const userDataValue = userDataCookie.split('=')[1];
			const decodedUserDataValue = decodeURIComponent(userDataValue);
			const userData = JSON.parse(decodedUserDataValue);
			const { name, id } = userData;
			setUser_id(id);
			setName(name);
		}
	}, []);


	return <UserContext.Provider value={{ user_id, setUser_id, name }}>{children}</UserContext.Provider>

};
