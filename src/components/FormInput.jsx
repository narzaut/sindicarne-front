import React, { useState } from "react";

export function TextInput({ errors, register, value, placeholder, required }) {
	return (
		<div className='flex py-3 flex-col'>
			<input onFocus={e => e.target.placeholder= ''}  className='w-52 placeholder-gray-400 text-shadow text-gray-100 border-transparent focus:outline-none border-4 focus-border-green  bg-blue-900 outline-none rounded  text-center' placeholder={placeholder}  {...register(value, { required: required } )} onBlur={e => (e.target.placeholder=placeholder)}/>
			{errors && <p className='text-shadow pt-1 pl-1 text-xs text-red-500 font-bold'>* Campo obligatorio</p>}
		</div>
  );
}
