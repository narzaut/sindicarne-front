import React, { useState } from "react";
import { useForm } from "react-hook-form";
//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { registerLocale } from  "react-datepicker";
//Custom components
import { TextInput } from "./FormInput";
import { SelectInput } from "./SelectInput";
import { dateToSql } from "../helpers/dateToSql";

export const InscriptionForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
	const [startDate, setStartDate] = useState({
		date: new Date(),
		validated: false
	});
	registerLocale('es', es);
	
	const onSubmit = (data, e) => {
		e.preventDefault();
		//Full name build
		data.nombrePostulante = data.nombrePostulante.trim() + ' ' + data.apellido.trim();
		//Validate user age
		if (startDate.date.getFullYear() <= new Date().getFullYear() - 17) {
			setStartDate({...startDate, validated:true});
		} else{
			setStartDate({...startDate, validated:false});
		};
		//If age is validated then POST form to DB
		if (startDate.validated == true) {
			data.fechaNacimiento  = dateToSql(startDate.date);
			fetch(`http://localhost:3001/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nombrePostulante: data.nombrePostulante,
					dniPostulante: data.dniPostulante,
					fingresoPostulante: "2008-11-11",
					fnacimientoPostulante: data.fechaNacimiento,
					estadocivil: parseInt(data.estadocivil),
					empresaPostulante: data.empresaPostulante.trim(),
					activoPostulante: 1,
					telPostulante: data.telPostulante,
					emailPostulante: data.emailPostulante.trim()
				})	
			})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(function(error) {
				console.log(error);
			});
		}	
	}

	const grupoFamiliarOptions = [
		{
			option:'Con grupo familiar',
			value: 1
		},
		{
			option:'Sin grupo familiar',
			value: 0
		}
	];

	return (
		<div className='flex flex-col w-full  items-center justify-center pb-10 mt-6'>
			<form className=' rounded-md glass shadow-2xl w-3/4 lg:w-1/2 py-4  lg:py-10  flex flex-col items-center justify-center' onSubmit={ handleSubmit(onSubmit)}>
				<p className='mb-2  text-gray-100  font-bold border-b-4 border-green rounded max-w-max'>Formulario de inscripción</p>
    		<TextInput key={'asd'} value='nombrePostulante' errors={errors.nombrePostulante}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput key={'asd1'} value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput type={'dni'} key={'asd2'} value='dniPostulante' errors={errors.dniPostulante}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<div className='text-center mx-auto pb-3 text-green'>
					<p className='text-gray-100'>Fecha de nacimiento</p>
					<DatePicker onBlur={() =>
						startDate.date.getFullYear() <= new Date().getFullYear() - 17 ?
							setStartDate({...startDate, validated:true})
						: 
							setStartDate({...startDate, validated:false})
						}
						key={'asd3'} dateFormat="dd/MM/yyyy" selected={startDate.date} className='outline-none border-4 border-transparent focus-border-green bg-blue-900 text-gray-100 rounded w-52  text-center' locale="es"  onChange={(date) => {setStartDate({...startDate, date:date})}}
					/>
					{startDate.date.getFullYear() > new Date().getFullYear() - 17  ? <p className='text-left pt-1  text-xs text-red-500 font-bold'>* Debe ser mayor de 17 años</p> : ''}
				</div>
				<TextInput type={'email'} key={'asd4'} value='emailPostulante' errors={errors.emailPostulante}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput type={'tel'} key={'asd5'} value='telPostulante' errors={errors.telPostulante}  placeholder='Teléfono / Celular' register={register} required={true}/>
    		<TextInput key={'asd6'} value='empresaPostulante' errors={errors.empresaPostulante} placeholder='Empresa' register={register} required={true} />
				<SelectInput key={'asd7'} options={grupoFamiliarOptions} placeholder='Grupo familiar' value='estadocivil' errors={errors.estadocivil} register={register} required={true} />
				<button className='tracking-wider bg-gradient-to-t from-green-300 to-blue-500 cursor-pointer text-shadow transition mt-4 hover-bg-green rounded  px-4 py-2 bg-green text-gray-100 font-semibold hover-press-animation hover:shadow-2xl' type="submit">INSCRIBIRSE</button>
    	</form>
		</div>
	)
}