import React, {useEffect, useState} from "react";

export function TextInput({type, errors, register, value, placeholder, required }) {
	const [error, setError] = useState('')
	//Conditional css
	let errorBorder;
	errors ? errorBorder = ' focus:border-red-400' : errorBorder = ' focus-border-green'
	
	//Select error message
	useEffect(() => {
		if (errors){
			errors.types.pattern ?
				setError(errors.types.pattern)
			:
				setError(errors.message)
		} else {
			setError('')
		}	
	}, [errors])

	//Validation based on prop 'type'
	let reg;
	if (type == 'email'){
		reg = register(value, {required: {value:required, message:'* Campo requerido'}, pattern: {value:/^\S+@\S+$/i, message:'* Email inválido'}})
	} else if (type == 'tel'){
		reg = register(value, {required: {value:required, message:'* Campo requerido'}, pattern: {value:/^[0-9]+$/i, message:'* Número no válido'}, minLength: {value: 6, message:'* Número no válido'}, maxLength: {value: 12, message:'* Número no válido'}})
	} else if (type == 'dni'){
		reg = register(value, { required: {value: required, message:'* Campo requerido'}, pattern: {value:/^[0-9]+$/i, message:'* Recuerde ingresar solo los números'}, minLength: {value: 7, message:'* Documento no válido'}, maxLength: {value: 8, message:'* Documento no válido'}})
	} else{
		reg = register(value, { required: {value: required, message:'* Campo requerido'}})
	}
	
	return (
		<div className='flex py-2 flex-col'>
			<input 
				{...reg}
				className={`hide-input-cursor  w-52 placeholder-gray-400 text-gray-100 border-transparent focus:outline-none border-4 input-color outline-none rounded  text-center  ${errorBorder}`}
				autoComplete={'off'}
				placeholder={placeholder}		
			/>
			<p className='pt-1 pl-1 text-xs text-red-500 font-bold'>{error}</p>
		</div>
  );
}
