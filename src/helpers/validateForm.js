//Validate form
export const validateForm = (data) => {
	const date = new Date()
	if (
		parseInt(data.fechaNacimiento.split('-')[0]) > date.getFullYear() - 18
	){
		if (
			data.emailPostulante.includes('@')
		){
			return true
		}
	} 
	return false
	
}