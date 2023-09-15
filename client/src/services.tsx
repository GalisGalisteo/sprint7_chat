import { PORT } from "./config/config"

export interface FormData {
	email: string;
	password: string;
}

export interface RegistrationData {
	name: string;
	email: string;
	password: string;
}

export const fetchIsAuthenticated = async () => {
	const response = await fetch(`http://localhost:${PORT}/api/auth/check-auth`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return response;
}

export async function fetchLogin(data: FormData) {
	const response = await fetch(`http://localhost:${PORT}/api/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}

export const fetchRegistration = async (data: RegistrationData | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}

export const fetchMessages = async () => {
	const response = await fetch(`http://localhost:${PORT}/api/messages`, {
		method: "GET"
	})
	return response;
}

export const fetchUserId = async () => {
	const response = await fetch(`http://localhost:${PORT}/api/callback`, {
		method: "GET"
	})
	return response;
}
export const fetchIndex = async () => {
	const response = await fetch(`http://localhost:${PORT}/`, {
		method: "GET"
	})
	return response;
}


export const sendNewMessage = async (id: string | null, text: string | null) => {
	const data = { text: text };
	const response = await fetch(`http://localhost:${PORT}/api/message/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}
