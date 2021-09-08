import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "./FormInput"
import { SelectInput } from "./SelectInput"
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

export const InscriptionForm = () => {
  
	registerLocale('es', es)
	
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [startDate, setStartDate] = useState(new Date());
	const [datePlaceholder, setDatePlaceholder] = useState('Fecha de nacimiento')
	const onSubmit = (data, e) => {
		e.preventDefault()
		data.fechaNacimiento = startDate;
		
		fetch(`http://localhost:3001/add`, {
			method: 'POST',
			
			headers: {
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({
				nombrePostulante: "test",
				dniPostulante: "3333333",
				fingresoPostulante: "2008-11-11",
				fnacimientoPostulante: "2008-11-11",
				estadocivil: 1,
				empresaPostulante: "sdfsdf",
				activoPostulante: 1,
				telPostulante: "sdfsdf",
				emailPostulante: "sdfsdf"
			})	
		})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(function(error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
		}
	const grupoFamiliarOptions = [
		{
			option:'Con grupo familiar',
			value: true
		},
		{
			option:'Sin grupo familiar',
			value: false
		}
	]

	const empresaOptions = [
		{
			option:'Empresa 1',
			value: 'empresa'
		},
		{
			option:'Empresa 2',
			value: 'empresa'
		},
		{
			option:'Empresa 3',
			value: 'empresa'
		},
	]
	return (
		<div className='flex flex-col  titillium-font w-full h-full items-center justify-center pb-10 mt-6'>
			<form className=' rounded-md glass shadow-2xl w-3/4 lg:w-1/2 py-4  lg:py-10  flex flex-col items-center justify-center' onSubmit={ handleSubmit(onSubmit)}>
				<p className='text-shadow mb-2  text-gray-100  font-bold border-b-4 border-green rounded max-w-max'>Formulario de inscripción</p>
				<TextInput key={'asd'} value='nombre' errors={errors.nombre}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput key={'asd1'} value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput key={'asd2'} value='dni' errors={errors.dni}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<div className='text-center mx-auto pb-1 text-green  text-shadow'>
					<p className='text-gray-100'>Fecha de nacimiento</p>
					<DatePicker key={'asd3'} dateFormat="dd/MM/yyyy" selected={startDate} className='bg-blue-900 text-gray-100 text-shadow rounded w-52 py-1 text-center' locale="es"  onChange={(date) => {setStartDate(date)}} />
					{startDate.getFullYear() > 2004 ? <p className='text-shadow text-left pt-1  text-xs text-red-500 font-bold'>* Debe ser mayor de 17 años</p> : ''}
				</div>
				<TextInput key={'asd4'} value='mail' errors={errors.mail}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput key={'asd5'} value='telefono' errors={errors.telefono}  placeholder='Telefono / Celular' register={register} required={true}/>
    		<TextInput key={'asd6'} value='empresa' errors={errors.empresa} placeholder='Empresa' register={register} required={true} />
				<SelectInput key={'asd7'} options={grupoFamiliarOptions} placeholder='Grupo familiar' value='grupoFamiliar' errors={errors.grupoFamiliar} register={register} required={true} />
				
				<input value='INSCRIBIRSE' className='shadow-inner transition mt-4 hover:border-0 hover-bg-green text-gray-200 text-shadow rounded hover:border-2 hover:border-blue-900 px-4 py-2 bg-green text-gray-100 font-semibold hover-press-animation hover:shadow-2xl' type="submit"/>
    	</form>
		</div>
	)
}

/*

idPostulante
nombrePostulante	****
dniPostulante	****
fechaIngresoPostulante
fechaNacimientoPostulante	****
grupoFamiliarPostulante	****
empresaPostulante	****
activoPostulante
fechaCargaPostulante
telefonoPostulante	****
mailPostulante	****
*/

