import React from "react";
//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { registerLocale } from  "react-datepicker";

export function DateInput({icon, startDate, setStartDate}) {
	registerLocale('es', es);
	//Conditional css

	let errorBorder;
	errorBorder = ' focus:border-red-400'
	return (
		<div className='pt-2'>
			<p>Fecha de nacimiento</p>
			<div className='relative'>
				<i class={"z-10 text-gray-700 absolute top-1/2 transform -translate-y-1/2 left-3 " + icon}></i>
				<DatePicker onBlur={() =>
					startDate.date.getFullYear() <= new Date().getFullYear() - 17 ?
						setStartDate({...startDate, validated:true})
					: 
						setStartDate({...startDate, validated:false})
					}
					key={'asd3'} dateFormat="dd/MM/yyyy" selected={startDate.date} className={`py-1 outline-none border-4 border-transparent focus-border-green input-color text-gray-800 font-semibold rounded w-52  text-center ${errorBorder}`} locale="es"  onChange={(date) => {setStartDate({...startDate, date:date})}}
				/>
			</div>
			{startDate.date.getFullYear() > new Date().getFullYear() - 17  ? <p className='pl-1 text-left pt-1  text-xs text-red-500 font-bold'><i class="fas fa-exclamation-circle"></i> Debe ser mayor de 17 años</p> : ''}
		</div>
		
  );
}