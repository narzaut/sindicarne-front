import React from "react";

export function TextInput({type, errors, register, value, placeholder, required }) {
	let reg;
	if (type == 'email'){
		reg = register(value, {required: {value:required, message:'* Campo requerido'}, pattern: {value:/^\S+@\S+$/i, message:'* Email inválido'}})
	} else if (type == 'tel'){
		reg = register(value, {required: {value:required, message:'* Campo requerido'}, pattern: {value:/^[0-9]+$/i, message:'* Número no válido'}, minLength: {value: 6, message:'* Número no válido'}, maxLength: {value: 12, message:'* Número no válido'}})
	} else{
		reg = register(value, { required: {value: required, message:'* Campo requerido'}})
	}
	
	return (
		<div className='flex py-3 flex-col'>
			<input 
				{...reg}
				className='w-52 placeholder-gray-400 text-shadow text-gray-100 border-transparent focus:outline-none border-4 focus-border-green  bg-blue-900 outline-none rounded  text-center'
				autoComplete={'off'}
				placeholder={placeholder}
				onFocus={e => e.target.placeholder= ''}
				onBlur={e => (e.target.placeholder=placeholder)}
			/>
			{errors?.message && <p className='text-shadow pt-1 pl-1 text-xs text-red-500 font-bold'>{errors?.message}</p>}
		</div>
  );
}
