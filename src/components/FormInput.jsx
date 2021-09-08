import React, { useState } from "react";
import { set } from "react-hook-form";

export function TextInput({ errors, register, value, placeholder, required }) {
	return (
		<div className='flex py-3 flex-col'>
			<input 
				{...register(value, { required: {value: required, message:'* Campo requerido'}})}
				
				autoComplete={'off'}
				onFocus={e => e.target.placeholder= ''}
				className='w-52 placeholder-gray-400 text-shadow text-gray-100 border-transparent focus:outline-none border-4 focus-border-green  bg-blue-900 outline-none rounded  text-center'
				placeholder={placeholder}
				onBlur={e => (e.target.placeholder=placeholder)}

				/>
			{errors?.message && <p className='text-shadow pt-1 pl-1 text-xs text-red-500 font-bold'>{errors?.message}</p>}
		</div>
  );
}
