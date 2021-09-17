import { dateToSql } from "./dateToSql";

export const postRequest = (token, data) => {
	return (
		fetch(`http://api.sindicarne.com.ar/postulantes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token
			},
			body: JSON.stringify({
				nombrePostulante: data.nombrePostulante,
				dniPostulante: data.dniPostulante,
				fingresoPostulante: dateToSql(new Date()),
				fnacimientoPostulante: data.fechaNacimiento,
				estadocivil: parseInt(data.estadocivil),
				empresaPostulante: data.empresaPostulante.trim(),
				activoPostulante: 1,
				telPostulante: data.telPostulante,
				emailPostulante: data.emailPostulante.trim().toLowerCase()
			})	
		})
	)	
}