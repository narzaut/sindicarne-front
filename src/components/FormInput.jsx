import React, { useState } from "react";

export function TextInput({ errors, register, value, placeholder, required }) {
	return (
		<div className='flex py-2 flex-col'>
			<input onFocus={e => e.target.placeholder= ''}  className='w-52 placeholder-gray-400 text-shadow text-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue outline-none rounded py-1 text-center' placeholder={placeholder}  {...register(value, { required: required } )} onBlur={e => (e.target.placeholder=placeholder)}/>
			{errors && <p className='text-shadow pt-1 pl-1 text-xs text-red-500 font-bold'>* Campo obligatorio</p>}
		</div>
  );
}
