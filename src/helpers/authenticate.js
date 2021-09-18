export const authenticate = async () => {
	let token;

	await fetch(`//localhost:3030/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user: "admin",
			password:"itec2021"
		})	
	})
	.then(response => {
		return response.json()
	})
	.then(json => {
		token = json
	})
	.catch(error => {
		token = error
	})
	return token
}