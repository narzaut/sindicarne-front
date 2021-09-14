export const authenticate = async () => {
	let token;

	await fetch(`http://localhost:3001/api/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user: "postulante"
		})	
	})
	.then(response => {
		return response.json()
	})
	.then(json => {
		if (json.ok == true) {
			token = json.token
		} else {
			token = null
		}
	})
	.catch(error => {
		token = null
		return null
	})
	return token
}