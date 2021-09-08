import React, { useState } from "react";

export function DniInput({ errors, register, value, placeholder, required }) {
	const [asd, setAsd] = useState()
	const dniPostulante = register(value, { required: {value: required, message:'* Campo requerido'}, pattern: {value:/^[0-9.]+$/i, message:'* Documento no válido'}, minLength: {value: 7, message:'* Documento no válido'}, maxLength:{value:8, message:'* Documento no valido'} } )
	return (
		<div className='flex py-3 flex-col'>
			<input 
				{...dniPostulante}
				
				autoComplete={'off'}
				onFocus={e => e.target.placeholder= ''}
				className='w-52 placeholder-gray-400 text-shadow text-gray-100 border-transparent focus:outline-none border-4 focus-border-green  bg-blue-900 outline-none rounded  text-center'
				placeholder={placeholder}
				onBlur={e => (e.target.placeholder=placeholder)}
				value={asd}
				onChange={e => {
					dniPostulante.onChange(e)
					setAsd(e.target.value.split(/\D/).join(''))	
				}}
			/>
			{errors?.message && <p className='text-shadow pt-1 pl-1 text-xs text-red-500 font-bold'>{errors?.message}</p>}
		</div>
  );
}
