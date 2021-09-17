import React from "react";

export function SelectInput({icon, options, placeholder, errors, register, value, required }) {
	//Conditional css
	let errorBorder;
	errors ? errorBorder = ' focus:border-red-400' : errorBorder = ' focus-border-green'
	
	return (
		<div className='py-3 '>
			<p>{placeholder}</p>
			<div className='flex  pb-4 flex-col  '>
				<div className={'relative '}>
					<i class={"text-gray-700 absolute top-1/2 transform -translate-y-1/2 left-3 " + icon}></i>
					<select 
						className={`outline-none w-60 py-1 flex text-center  mx-auto text-gray-800 font-semibold border-4 border-transparent input-color  rounded  pl-2 ${errorBorder}`}
						{...register(value, { required: required })}
						name={value}
					>
						<option  value='' hidden selected></option>
						{options.map(option => {
							return <option value={option.value}>{option.option}</option>
						})}
    			</select>
				</div>
				
				{errors && <p className='pt-1 pl-1 text-xs text-red-500 font-bold'><i class="fas fa-exclamation-circle"></i> Campo obligatorio</p>}
			</div>
		</div>
  );
}
