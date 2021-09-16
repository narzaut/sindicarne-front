import React from "react";
//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { registerLocale } from  "react-datepicker";
//Custom helper
import { validateAge } from "../helpers/validateAge";

export function DateInput({icon, startDate, setStartDate}) {
	registerLocale('es', es);
	//Conditional css
	const fechaNacimiento = validateAge(startDate)
	let errorBorder = fechaNacimiento.validated == false ? ' focus:border-red-400' : ' focus-border-green'
	return (
		<div className='pt-2'>
			<label for='fnacimiento'>Fecha de nacimiento</label>
			<div className='relative'>
				<i class={"z-10 text-gray-700 absolute top-1/2 transform -translate-y-1/2 left-3 " + icon}></i>
				<DatePicker key={'asd3'}
					id='fnacimiento'
					name='Fecha de nacimiento'
					dateFormat="dd/MM/yyyy" 
					selected={startDate.date} 
					className={`py-1 outline-none border-4 border-transparent focus-border-green input-color text-gray-800 font-semibold rounded w-60  text-center ${errorBorder}`}
					locale="es" 
					onChange={(date) => {if (date){ setStartDate({...startDate, date:date})}}}
				/>
			</div>
			{fechaNacimiento.validated == false ? <p className='pl-1 text-left pt-1  text-xs text-red-500 font-bold'><i class="fas fa-exclamation-circle"></i> Debe ser mayor de 17 años</p> : ''}
		</div>
		
  );
}