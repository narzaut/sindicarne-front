import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "./FormInput"
import { SelectInput } from "./SelectInput"
export const InscriptionForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);
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
		<div className='flex flex-col titillium-font w-full items-center pb-10'>
			<form className=' rounded-md glass shadow-2xl w-3/4 py-4  flex flex-col items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
				<p className='text-shadow mb-4  text-gray-200  font-bold border-b-4 border-blue-500 max-w-max'>Formulario de inscripción</p>
				<TextInput value='nombre' errors={errors.nombre}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput value='dni' errors={errors.dni}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<TextInput value='mail' errors={errors.mail}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput value='telefono' errors={errors.telefono}  placeholder='Telefono / Celular' register={register} required={true}/>
    		<SelectInput options={grupoFamiliarOptions} placeholder='Grupo familiar' value='grupoFamiliar' errors={errors.grupoFamiliar} register={register} required={true} />
    		<SelectInput options={empresaOptions} placeholder='Empresa' value='empresa' errors={errors.empresa} register={register} required={true} />
				
				<input value='Realizar inscripción' className='transition mt-4 hover:border-0 hover:bg-blue-600 rounded border-4 border-blue-600 px-4 py-2 bg-transparent text-gray-100 font-semibold hover-press-animation hover:shadow-2xl' type="submit"/>
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

