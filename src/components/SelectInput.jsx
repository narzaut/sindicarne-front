import React, { useState } from "react";

export function SelectInput({ options, placeholder, errors, register, value, required }) {
	return (
		<div className='flex py-3 flex-col w-52 '>
					<select 
						className=' text-center text-gray-100 border-4 border-transparent focus-border-green bg-blue-900  rounded  pl-2'
						{...register(value, { required: required })}
					>
						<option value='' hidden selected>{placeholder}</option>
						{options.map(option => {
							return <option value={option.value}>{option.option}</option>
						})}
    			</select>
					
					{errors && <p className='pt-1 pl-1 text-xs text-red-500 font-bold'>* Campo obligatorio</p>}
				</div>
  );
}
