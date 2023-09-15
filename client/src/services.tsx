import { PORT } from "./config/config"

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