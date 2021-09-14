export const validateAge = (date) => {
	if (date.date.getFullYear() <= new Date().getFullYear() - 17) {
		return {...date, validated:true};
	} else{
		return {...date, validated:false};
	};
}