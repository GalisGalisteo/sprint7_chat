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

export const fetchMessages = async (token: string | null) => {
	const response = await fetch(`http://localhost:${PORT}/api/messages`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return response;
}
export const sendNewMessage = async (token: string | null, id: string | null, text: string | null) => {
	const data = { text: text };
	const response = await fetch(`http://localhost:${PORT}/api/message/${id}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response
}