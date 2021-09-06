import React, { useState } from "react";

export function SelectInput({ options, placeholder, errors, register, value, required }) {
	return (
		<div className='flex py-2 flex-col w-52 '>
					<select className='text-center text-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue outline-none rounded py-2 pl-2' {...register(value, { required: required })}>
						<option value='' hidden selected>{placeholder}</option>
						{options.map(option => {
							return <option value={option.value}>{option.option}</option>
						})}

    			</select>
					{errors && <p className='text-shadow pt-1 pl-1 text-xs text-red-500 font-bold'>* Campo obligatorio</p>}
				</div>
  );
}
