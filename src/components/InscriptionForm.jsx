import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "./FormInput"
import { SelectInput } from "./SelectInput"
import { DniInput } from "./DniInput"
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

export const InscriptionForm = () => {
  
	registerLocale('es', es)
	
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [startDate, setStartDate] = useState(new Date());

	//Convert Javascript Date to SQL Date
	const dateToSql = (date) => {
		return date.getFullYear() + '-' + (date.getMonth()+1)+ '-' + date.getDate();
	}
	
	const onSubmit = (data, e) => {
		e.preventDefault()
		data.nombrePostulante = data.nombrePostulante.trim() + ' ' + data.apellido.trim()
		data.fechaNacimiento  = dateToSql(startDate)
		
		fetch(`http://localhost:3001/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nombrePostulante: data.nombrePostulante,
				dniPostulante: data.dniPostulante.trim(),
				fingresoPostulante: "2008-11-11",
				fnacimientoPostulante: data.fechaNacimiento,
				estadocivil: parseInt(data.estadocivil),
				empresaPostulante: data.empresaPostulante.trim(),
				activoPostulante: 1,
				telPostulante: data.telPostulante.trim(),
				emailPostulante: data.emailPostulante.trim()
			})	
		})
		.then(response => response.json())
		.then(json => console.log(json))
		.catch(function(error) {
			console.log(error);
		});
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
	]

	return (
		<div className='flex flex-col  titillium-font w-full  items-center justify-center pb-10 mt-6'>
			<form className=' rounded-md glass shadow-2xl w-3/4 lg:w-1/2 py-4  lg:py-10  flex flex-col items-center justify-center' onSubmit={ handleSubmit(onSubmit)}>
				<p className='text-shadow mb-2  text-gray-100  font-bold border-b-4 border-green rounded max-w-max'>Formulario de inscripción</p>
    		<TextInput key={'asd'} value='nombrePostulante' errors={errors.nombrePostulante}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput key={'asd1'} value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<DniInput key={'asd2'} value='dniPostulante' errors={errors.dniPostulante}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<div className='text-center mx-auto pb-1 text-green  text-shadow'>
					<p className='text-gray-100'>Fecha de nacimiento</p>
					<DatePicker key={'asd3'} dateFormat="dd/MM/yyyy" selected={startDate} className='bg-blue-900 text-gray-100 text-shadow rounded w-52 py-1 text-center' locale="es"  onChange={(date) => {setStartDate(date)}} />
					{startDate.getFullYear() > 2004 ? <p className='text-shadow text-left pt-1  text-xs text-red-500 font-bold'>* Debe ser mayor de 17 años</p> : ''}
				</div>
				<TextInput key={'asd4'} value='emailPostulante' errors={errors.emailPostulante}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput key={'asd5'} value='telPostulante' errors={errors.telPostulante}  placeholder='Telefono / Celular' register={register} required={true}/>
    		<TextInput key={'asd6'} value='empresaPostulante' errors={errors.empresaPostulante} placeholder='Empresa' register={register} required={true} />
				<SelectInput key={'asd7'} options={grupoFamiliarOptions} placeholder='Grupo familiar' value='estadocivil' errors={errors.estadocivil} register={register} required={true} />
    		
				
				<input value='INSCRIBIRSE' className='shadow-inner transition mt-4 hover:border-0 hover-bg-green text-gray-200 text-shadow rounded hover:border-2 hover:border-blue-900 px-4 py-2 bg-green text-gray-100 font-semibold hover-press-animation hover:shadow-2xl' type="submit"/>
    	</form>
		</div>
	)
}

/*

<TextInput key={'asd'} value='nombrePostulante' errors={errors.nombrePostulante}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput key={'asd1'} value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput key={'asd2'} value='dniPostulante' errors={errors.dniPostulante}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<div className='text-center mx-auto pb-1 text-green  text-shadow'>
					<p className='text-gray-100'>Fecha de nacimiento</p>
					<DatePicker key={'asd3'} dateFormat="dd/MM/yyyy" selected={startDate} className='bg-blue-900 text-gray-100 text-shadow rounded w-52 py-1 text-center' locale="es"  onChange={(date) => {setStartDate(date)}} />
					{startDate.getFullYear() > 2004 ? <p className='text-shadow text-left pt-1  text-xs text-red-500 font-bold'>* Debe ser mayor de 17 años</p> : ''}
				</div>
				<TextInput key={'asd4'} value='emailPostulante' errors={errors.emailPostulante}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput key={'asd5'} value='telPostulante' errors={errors.telPostulante}  placeholder='Telefono / Celular' register={register} required={true}/>
    		<TextInput key={'asd6'} value='empresaPostulante' errors={errors.empresaPostulante} placeholder='Empresa' register={register} required={true} />
				<SelectInput key={'asd7'} options={grupoFamiliarOptions} placeholder='Grupo familiar' value='estadocivil' errors={errors.estadocivil} register={register} required={true} />
*/

