
export const emailRequest = (data) => {
	return (
		fetch(`http://64.225.47.18:3030/api/send-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nombrePostulante: data.nombrePostulante,
				dniPostulante: data.dniPostulante,
				empresaPostulante: data.empresaPostulante.trim(),
				telPostulante: data.telPostulante,
				emailPostulante: data.emailPostulante.trim()
			})	
		})
	)	
}