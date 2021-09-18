
export const emailRequest = (data) => {
	return (
		fetch(`//localhost:3030/send-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nombrePostulante: data.nombrePostulante,
				dniPostulante: data.dniPostulante,
				empresaPostulante: data.empresaPostulante.trim(),
				telPostulante: data.telPostulante,
				emailPostulante: data.emailPostulante.trim().toLowerCase()
			})	
		})
	)	
}